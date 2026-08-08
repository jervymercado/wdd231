// nav.js — ES module: responsive nav toggle + wayfinding highlight
export function initNav() {
  const toggleBtn = document.querySelector('#nav-toggle');
  const nav = document.querySelector('.main-nav');

  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Wayfinding: mark the link matching the current page as current
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach((link) => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.setAttribute('aria-current', 'page');
    }
  });
}
