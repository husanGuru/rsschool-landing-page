const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.menu__panel');

function renderCard(product, isExtra) {
  return `
    <li class="card${isExtra ? ' card--extra' : ''}" data-id="${product.id}">
      <div class="card__media">
        <img src="${product.image}" width="340" height="340" alt="${product.name}" loading="lazy">
      </div>
      <div class="card__body">
        <div class="card__info">
          <h3 class="heading-3">${product.name}</h3>
          <p>${product.description}</p>
        </div>
        <p class="card__price">$${product.price}</p>
      </div>
    </li>
  `;
}

function renderPanel(panel) {
  const items = products.filter((product) => product.category === panel.dataset.panel);

  const grid = document.createElement('ul');
  grid.className = 'grid';
  grid.innerHTML = items.map((product, index) => renderCard(product, index >= 4)).join('');
  panel.append(grid);

  if (items.length > 4) {
    const more = document.createElement('div');
    more.className = 'more';
    more.innerHTML = `
      <button class="icon-btn more__btn" type="button" aria-label="Show more ${panel.dataset.panel} items">
        <span class="icon icon--refresh"></span>
      </button>
    `;
    panel.append(more);

    more.querySelector('.more__btn').addEventListener('click', () => {
      grid.classList.add('is-expanded');
      more.hidden = true;
    });
  }
}

panels.forEach(renderPanel);

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
