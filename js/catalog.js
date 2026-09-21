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
