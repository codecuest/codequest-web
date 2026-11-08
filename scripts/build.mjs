// Compila SCSS y copia los archivos estáticos a dist/.
import { cpSync, mkdirSync, rmSync, writeFileSync, existsSync, watch } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as sass from "sass";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "src");
const dist = join(root, "dist");

function copyStatic() {
  for (const item of ["index.html", "404.html", "robots.txt", "js", "assets"]) {
    const from = join(src, item);
    if (existsSync(from)) cpSync(from, join(dist, item), { recursive: true });
  }
}

function buildCss() {
  const result = sass.compile(join(src, "scss/main.scss"), { style: "compressed" });
  mkdirSync(join(dist, "css"), { recursive: true });
  writeFileSync(join(dist, "css/main.css"), result.css);
}

function build() {
  try {
    copyStatic();
    buildCss();
    console.log(`[build] listo ${new Date().toLocaleTimeString()}`);
  } catch (err) {
    console.error("[build] error:", err.message);
    if (!process.argv.includes("--watch")) process.exit(1);
  }
}

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
build();

if (process.argv.includes("--watch")) {
  watch(src, { recursive: true }, () => build());
  console.log("[build] observando src/ ...");
}
