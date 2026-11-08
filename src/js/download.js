import { isConfigured, latestApiUrl, releasesPage } from "./config.js";

function formatSize(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
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
    const res = await fetch(latestApiUrl(), { headers: { Accept: "application/vnd.github+json" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const release = await res.json();
    const apk = (release.assets || []).find((a) => a.name.toLowerCase().endsWith(".apk"));
    if (!apk) throw new Error("Sin APK en la release");

    buttons.forEach((btn) => { btn.href = apk.browser_download_url; });
    if (status) status.textContent = `${apk.name} · ${formatSize(apk.size)}`;
  } catch {
    if (status) status.textContent = "Se abrirá la página de la versión más reciente.";
  }
}