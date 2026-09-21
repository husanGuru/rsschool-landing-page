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
});
