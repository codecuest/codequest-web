import { apkUrl, config, isConfigured } from "./config.js";

export function initDownload() {
  const buttons = document.querySelectorAll("[data-download]");
  const status = document.getElementById("download-status");

  if (isConfigured()) {
    buttons.forEach((btn) => {
      btn.href = apkUrl();
      btn.rel = "noopener";
    });
    if (status) status.textContent = config.apkFileName;
    return;
  }

  // Sin configurar: el botón del final queda desactivado, el de la portada baja a esa sección.
  const main = document.getElementById("download-main");
  if (main) {
    main.setAttribute("aria-disabled", "true");
    main.textContent = "APK próximamente";
    main.addEventListener("click", (e) => e.preventDefault());
  }
  if (status) status.textContent = "El archivo se publicará aquí en cuanto esté listo.";
}
