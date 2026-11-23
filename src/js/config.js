// Configuración de la página.
export const config = {
  githubUser: "codecuest",
  githubRepo: "codequest-web",
};

export function isConfigured() {
  return config.githubUser !== "TU-USUARIO";
}

const repo = () => `${config.githubUser}/${config.githubRepo}`;

// Página de la última versión (sirve de respaldo para el botón).
export function releasesPage() {
  return `https://github.com/${repo()}/releases/latest`;
}

// Página con todas las versiones.
export function releasesAll() {
  return `https://github.com/${repo()}/releases`;
}

// API pública con las versiones y su contador de descargas.
export function releasesApi() {
  return `https://api.github.com/repos/${repo()}/releases?per_page=100`;
}

// Historial de descargas guardado por GitHub Actions en el repositorio.
export function historyUrl() {
  return `https://raw.githubusercontent.com/${repo()}/main/data/downloads.json`;
}