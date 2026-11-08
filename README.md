# CodeQuest · sitio de descarga

Página de presentación y descarga de la app **CodeQuest** (Ionic + Angular, Android).
Se publica en GitHub Pages y el APK se descarga desde las *Releases* del repositorio.

## Estructura

```
.github/workflows/deploy.yml   Compila y publica en GitHub Pages en cada push a main
scripts/build.mjs              Compila SCSS y copia archivos a dist/
src/
  index.html                   Página principal
  404.html                     Página de error
  robots.txt
  assets/favicon.svg
  js/
    config.js                  Usuario/repositorio de GitHub y nombre del APK
    download.js                Botón de descarga
    demo.js                    Pregunta de ejemplo del teléfono
    main.js                    Punto de entrada
  scss/
    main.scss                  Punto de entrada de estilos
    abstracts/                 Variables y mixins
    base/                      Reset y tipografía
    layout/                    Cabecera, héroe, secciones, pie
    components/                Botón, teléfono, tarjetas, pasos
```

`dist/` se genera solo y no se sube a git.

## Desarrollo local

Requiere Node 18 o superior.

```bash
npm install
npm run dev      # compila, observa cambios y abre http://localhost:5173
npm run build    # compilación única en dist/
```

## Configuración (una sola vez)

1. En `src/js/config.js` cambia `githubUser` por tu usuario de GitHub.
2. En GitHub: **Settings → Pages → Source: GitHub Actions**.
3. Haz push a `main`. El sitio queda en `https://TU-USUARIO.github.io/codequest/`.

## Publicar una versión nueva de la app

1. Genera el APK:
   ```bash
   ionic.cmd build
   npx.cmd cap sync android
   cd android
   .\gradlew.bat assembleDebug
   ```
   Ruta: `android\app\build\outputs\apk\debug\app-debug.apk`
2. En GitHub: **Releases → Draft a new release**, crea una etiqueta (por ejemplo `v0.2.0`) y adjunta `app-debug.apk` con ese nombre exacto.
3. Publica la release. El botón de la página apunta a `releases/latest/download/app-debug.apk`, así que descarga la versión nueva sin cambiar el código.

## Licencia

MIT
