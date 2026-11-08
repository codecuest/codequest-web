// Configuración de la página.
export const config = {
  githubUser: "codecuest",
  githubRepo: "codequest-web",
};

export function isConfigured() {
  return config.githubUser !== "TU-USUARIO";
}

// Página de la última versión (sirve de respaldo).
export function releasesPage() {
  const { githubUser, githubRepo } = config;
  return `https://github.com/${githubUser}/${githubRepo}/releases/latest`;
}

// API que devuelve los archivos de la última versión.
export function latestApiUrl() {
  const { githubUser, githubRepo } = config;
  return `https://api.github.com/repos/${githubUser}/${githubRepo}/releases/latest`;
}