// Guarda el historial de descargas del APK en data/downloads.json.
// Se ejecuta en GitHub Actions. Si una Release se borra o un APK se reemplaza,
// lo ya contado se conserva.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const repo = process.env.GITHUB_REPOSITORY || "codecuest/codequest-web";
const api = process.env.GITHUB_API_URL || "https://api.github.com";
const file = "data/downloads.json";

const headers = { Accept: "application/vnd.github+json", "User-Agent": "codequest-downloads" };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const res = await fetch(`${api}/repos/${repo}/releases?per_page=100`, { headers });
if (!res.ok) {
  console.error(`No se pudo leer las releases: HTTP ${res.status}`);
  process.exit(1);
}
const releases = (await res.json()).filter((r) => !r.draft);

const previous = existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : { assets: {} };
const assets = { ...previous.assets };

for (const release of releases) {
  for (const asset of release.assets || []) {
    if (!asset.name.toLowerCase().endsWith(".apk")) continue;
    const key = `${release.tag_name}/${asset.name}`;
    const old = assets[key] || { tag: release.tag_name, name: asset.name, base: 0, last: 0 };
    // Si el contador de GitHub bajó, el archivo se reemplazó: lo anterior pasa a "base".
    const reset = asset.download_count < old.last;
    assets[key] = {
      tag: old.tag,
      name: old.name,
      base: reset ? old.base + old.last : old.base,
      last: asset.download_count,
    };
  }
}

const total = Object.values(assets).reduce((sum, a) => sum + a.base + a.last, 0);
const text = `${JSON.stringify({ total, assets }, null, 2)}\n`;

if (!existsSync(file) || readFileSync(file, "utf8") !== text) {
  mkdirSync("data", { recursive: true });
  writeFileSync(file, text);
  console.log(`Historial actualizado. Total: ${total}`);
} else {
  console.log(`Sin cambios. Total: ${total}`);
}