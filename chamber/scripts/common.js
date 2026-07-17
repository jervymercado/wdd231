// Shared behavior for every page: footer date/year + mobile nav toggle

const yearSpan = document.querySelector("#currentYear");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

const modifiedSpan = document.querySelector("#lastModified");
if (modifiedSpan) modifiedSpan.textContent = `Last Updated: ${document.lastModified}`;

const navToggle = document.querySelector("#navToggle");
const primaryNav = document.querySelector("#primaryNav");

if (navToggle && primaryNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");
    navToggle.textContent = isOpen ? "\u2715" : "\u2630";
    navToggle.setAttribute("aria-expanded", isOpen);
  });
}
