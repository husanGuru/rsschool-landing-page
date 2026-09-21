const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.menu__panel');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((item) => {
      item.setAttribute('aria-pressed', item === tab);
    });
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.panel !== tab.dataset.tab;
    });
  });
});

document.querySelectorAll('.more__btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.closest('.menu__panel').querySelector('.grid').classList.add('is-expanded');
    btn.parentElement.hidden = true;
  });
});
