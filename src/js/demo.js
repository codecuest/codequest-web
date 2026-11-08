// Pregunta de ejemplo del teléfono de la portada.
export function initDemo() {
  const opts = document.getElementById("opts");
  const feedback = document.getElementById("fb");
  const fill = document.getElementById("xp-fill");
  const label = document.getElementById("xp-label");
  if (!opts || !feedback || !fill || !label) return;

  let answered = false;
  opts.addEventListener("click", (event) => {
    const option = event.target.closest(".opt");
    if (!option || answered) return;

    if (option.hasAttribute("data-correct")) {
      answered = true;
      option.classList.add("ok");
      feedback.textContent = "¡Correcto! <a> define un enlace. +20 XP";
      fill.style.width = "60%";
      label.textContent = "XP 60";
    } else {
      option.classList.add("bad");
      feedback.textContent = "Casi. Prueba otra opción.";
    }
  });
}
