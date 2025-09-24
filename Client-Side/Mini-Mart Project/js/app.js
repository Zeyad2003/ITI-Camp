// app.js — Phase 1: listing, filter, search
import { fetchProducts, fetchCategories } from './api.js';

const els = {
  grid: document.getElementById('productsGrid'),
  spinner: document.getElementById('spinner'),
  error: document.getElementById('error'),
  retry: document.getElementById('retryBtn'),
  empty: document.getElementById('emptyState'),
  search: document.getElementById('searchInput'),
  category: document.getElementById('categorySelect'),
  year: document.getElementById('year')
};

let allProducts = [];

function setYear() {
  if (els.year) els.year.textContent = String(new Date().getFullYear());
}

function show(el) { el?.removeAttribute('hidden'); }
function hide(el) { el?.setAttribute('hidden', ''); }

function renderCategories(categories) {
  // Reset options but keep the first option "All"
  while (els.category.options.length > 1) {
    els.category.remove(1);
  }
  for (const c of categories) {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c[0].toUpperCase() + c.slice(1);
    els.category.appendChild(opt);
  }
}

function productCard(p) {
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `
    <div class="image-wrap">
      <img src="${p.image}" alt="${p.title}" loading="lazy" />
    </div>
    <div class="content">
      <div class="title">${p.title}</div>
      <div class="meta">${p.category}</div>
    </div>
    <div class="bottom">
      <div class="price">$${p.price.toFixed(2)}</div>
      <button class="btn-add" data-id="${p.id}" disabled title="Cart in Phase 3">Add</button>
    </div>
  `;
  return div;
}

function render(products) {
  els.grid.innerHTML = '';
  if (!products.length) {
    show(els.empty);
    return;
  }
  hide(els.empty);
  const frag = document.createDocumentFragment();
  for (const p of products) {
    frag.appendChild(productCard(p));
  }
  els.grid.appendChild(frag);
}

function currentFilters() {
  const q = els.search.value.trim().toLowerCase();
  const cat = els.category.value;
  let arr = allProducts;
  if (cat) arr = arr.filter(p => p.category === cat);
  if (q) arr = arr.filter(p => p.title.toLowerCase().includes(q));
  return arr;
}

function applyFilters() {
  const filtered = currentFilters();
  render(filtered);
}

function wireEvents() {
  els.search.addEventListener('input', applyFilters);
  els.category.addEventListener('change', applyFilters);
  els.retry.addEventListener('click', init);
}

async function init() {
  setYear();
  hide(els.error); hide(els.empty);
  show(els.spinner);
  try {
    const [products, categories] = await Promise.all([
      fetchProducts(),
      fetchCategories()
    ]);
    allProducts = products;
    renderCategories(categories);
    applyFilters();
  } catch (e) {
    console.error(e);
    show(els.error);
  } finally {
    hide(els.spinner);
  }
}

wireEvents();
init();
