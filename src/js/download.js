import { historyUrl, isConfigured, releasesApi, releasesPage } from "./config.js";
import { totalDownloads } from "./history.js";

const numberFormat = new Intl.NumberFormat("es-MX");

const isApk = (asset) => asset.name.toLowerCase().endsWith(".apk");

function formatSize(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" });
}

async function loadHistory() {
  try {
    const res = await fetch(historyUrl());
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

export async function initDownload() {
  const buttons = document.querySelectorAll("[data-download]");
  const status = document.getElementById("download-status");

  if (!isConfigured()) {
    const main = document.getElementById("download-main");
    if (main) {
      main.setAttribute("aria-disabled", "true");
      main.textContent = "APK próximamente";
      main.addEventListener("click", (e) => e.preventDefault());
    }
    if (status) status.textContent = "El archivo se publicará aquí en cuanto esté listo.";
    return;
  }

  // Respaldo inmediato: la página de la última versión.
  buttons.forEach((btn) => {
    btn.href = releasesPage();
    btn.rel = "noopener";
  });

  try {
    const [res, history] = await Promise.all([
      fetch(releasesApi(), { headers: { Accept: "application/vnd.github+json" } }),
      loadHistory(),
    ]);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const releases = (await res.json()).filter((r) => !r.draft);
    const latest = releases.find((r) => !r.prerelease);
    const apk = latest && (latest.assets || []).find(isApk);
    if (!apk) throw new Error("Sin APK en la release");

    const total = totalDownloads(history, releases);

    buttons.forEach((btn) => { btn.href = apk.browser_download_url; });
    if (status) status.textContent = `${apk.name} · ${formatSize(apk.size)}`;

    setText("spec-version", latest.tag_name.replace(/^v/i, ""));
    setText("spec-total", numberFormat.format(total));
    setText("spec-size", formatSize(apk.size));
    setText("spec-date", formatDate(latest.published_at));
  } catch {
    if (status) status.textContent = "Se abrirá la página de la versión más reciente.";
  }
}