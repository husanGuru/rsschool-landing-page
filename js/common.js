const root = document.documentElement;

if (localStorage.getItem('theme') === 'dark') {
  root.classList.add('dark-mode');
}

document.addEventListener('DOMContentLoaded', () => {
  const themeButtons = document.querySelectorAll('.theme-switch__btn');

  function setTheme(theme) {
    root.classList.toggle('dark-mode', theme === 'dark');
    localStorage.setItem('theme', theme);
    themeButtons.forEach((btn) => {
      btn.setAttribute('aria-pressed', btn.dataset.theme === theme);
    });
  }

  themeButtons.forEach((btn) => {
    btn.addEventListener('click', () => setTheme(btn.dataset.theme));
  });

  setTheme(root.classList.contains('dark-mode') ? 'dark' : 'light');

  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');

  function toggleMenu(open) {
    nav.classList.toggle('is-open', open);
    root.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  burger.addEventListener('click', () => {
    toggleMenu(!nav.classList.contains('is-open'));
  });

  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      toggleMenu(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      toggleMenu(false);
    }
  });

  window.matchMedia('(min-width: 1025px)').addEventListener('change', () => {
    toggleMenu(false);
  });
});
