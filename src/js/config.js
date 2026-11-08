// Configuración de la página. Edita solo este archivo para publicar una versión nueva.
export const config = {
  // Tu usuario y repositorio de GitHub (donde subes el APK en "Releases").
  githubUser: "codecuest",
  githubRepo: "codequest",
  // Nombre exacto del archivo adjunto en la release. Debe ser siempre el mismo.
  apkFileName: "app-debug.apk",
};

export function isConfigured() {
  return config.githubUser !== "TU-USUARIO";
}

// El enlace "latest" apunta siempre a la release más reciente, sin tocar el código.
export function apkUrl() {
  const { githubUser, githubRepo, apkFileName } = config;
  return `https://github.com/${githubUser}/${githubRepo}/releases/latest/download/${apkFileName}`;
}
