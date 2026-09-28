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
        <span class="icon icon--refresh" aria-hidden="true"></span>
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

const modal = document.querySelector('.modal');
const modalImg = modal.querySelector('.modal__img');
const modalTitle = modal.querySelector('#modal-title');
const modalDescription = modal.querySelector('.modal__description');
const modalPrice = modal.querySelector('.modal__price');
const sizeOptions = modal.querySelector('[data-size-options]');
const additiveOptions = modal.querySelector('[data-additive-options]');

let currentProduct = null;
let selectedSize = 's';
let selectedAdditives = new Set();

function renderSizeOptions() {
  sizeOptions.innerHTML = Object.keys(currentProduct.sizes).map((key) => {
    const size = currentProduct.sizes[key];
    return `
      <button class="option" type="button" data-size="${key}" aria-pressed="${key === selectedSize}">
        <span class="option__badge">${key.toUpperCase()}</span>
        ${size.size}
      </button>
    `;
  }).join('');
}

function renderAdditiveOptions() {
  additiveOptions.innerHTML = currentProduct.additives.map((additive, index) => `
    <button class="option" type="button" data-additive="${additive.name}" aria-pressed="${selectedAdditives.has(additive.name)}">
      <span class="option__badge">${index + 1}</span>
      ${additive.name}
    </button>
  `).join('');
}

function updateTotal() {
  let total = parseFloat(currentProduct.price) + parseFloat(currentProduct.sizes[selectedSize]['add-price']);

  currentProduct.additives.forEach((additive) => {
    if (selectedAdditives.has(additive.name)) {
      total += parseFloat(additive['add-price']);
    }
  });

  modalPrice.textContent = `$${total.toFixed(2)}`;
}

function openModal(product) {
  currentProduct = product;
  selectedSize = 's';
  selectedAdditives = new Set();

  modalImg.src = product.image;
  modalImg.alt = product.name;
  modalTitle.textContent = product.name;
  modalDescription.textContent = product.description;

  renderSizeOptions();
  renderAdditiveOptions();
  updateTotal();

  modal.hidden = false;
  document.documentElement.style.overflow = 'hidden';
}

function closeModal() {
  modal.hidden = true;
  document.documentElement.style.overflow = '';
}

document.addEventListener('click', (e) => {
  const card = e.target.closest('.card');
  if (!card) return;

  const product = products.find((item) => item.id === card.dataset.id);
  openModal(product);
});

modal.addEventListener('click', (e) => {
  const sizeBtn = e.target.closest('[data-size]');
  if (sizeBtn) {
    selectedSize = sizeBtn.dataset.size;
    renderSizeOptions();
    updateTotal();
    return;
  }

  const additiveBtn = e.target.closest('[data-additive]');
  if (additiveBtn) {
    const name = additiveBtn.dataset.additive;
    if (selectedAdditives.has(name)) {
      selectedAdditives.delete(name);
    } else {
      selectedAdditives.add(name);
    }
    renderAdditiveOptions();
    updateTotal();
    return;
  }

  if (e.target === modal || e.target.closest('[data-close]')) {
    closeModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.hidden) {
    closeModal();
  }
});
