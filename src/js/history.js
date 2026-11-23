const isApk = (asset) => asset.name.toLowerCase().endsWith(".apk");

// Suma lo guardado en data/downloads.json con lo que GitHub informa ahora.
// - Si una Release ya no existe, se conserva lo guardado.
// - Si un archivo se reemplazó (el contador bajó), se suma lo anterior.
export function totalDownloads(history, releases) {
  const saved = (history && history.assets) || {};
  const live = new Map();

  for (const release of releases) {
    for (const asset of release.assets || []) {
      if (isApk(asset)) live.set(`${release.tag_name}/${asset.name}`, asset.download_count);
    }
  }

  let total = 0;
  for (const key of new Set([...Object.keys(saved), ...live.keys()])) {
    const entry = saved[key] || { base: 0, last: 0 };
    const now = live.has(key) ? live.get(key) : entry.last;
    total += entry.base + (now < entry.last ? entry.last + now : now);
  }
  return total;
}