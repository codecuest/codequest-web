// En pantallas pequeñas la ficha de la app se abre desde un botón de la barra superior.
export function initSpecToggle() {
  const button = document.querySelector(".top__toggle");
  const panel = document.getElementById("spec-panel");
  if (!button || !panel) return;

  const setOpen = (open) => {
    panel.classList.toggle("is-open", open);
    button.setAttribute("aria-expanded", String(open));
    button.textContent = open ? "Cerrar" : "Ficha";
  };

  button.addEventListener("click", () => setOpen(!panel.classList.contains("is-open")));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
}