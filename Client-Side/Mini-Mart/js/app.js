import { fetchProducts, fetchCategories } from './api.js';
import { getFavorites, saveFavorites, getCart } from './storage.js';
import { addToCart } from './cart-utils.js';
import { createProductCard } from './ui.js';

const productsGrid = document.getElementById('products');
const categoryFilters = document.getElementById('category-filters');
const searchInput = document.getElementById('search');
const loadingIndicator = document.getElementById('loading');

let allProducts = [];
let cart = [];
let favorites = new Set();

async function init() {
    loadingIndicator.style.display = 'block';
    favorites = new Set(getFavorites());
    cart = getCart();

    const [products, categories] = await Promise.all([
        fetchProducts(),
        fetchCategories(),
    ]);

    allProducts = products;
    renderProducts(allProducts);
    populateCategories(categories);

    loadingIndicator.style.display = 'none';
}

function renderProducts(products) {
    productsGrid.innerHTML = '';
    if (products.length === 0) {
        productsGrid.innerHTML = '<p>No products found.</p>';
        return;
    }

    products.forEach(product => {
        const isFavorited = favorites.has(product.id);
        const card = createProductCard(product, isFavorited);
        productsGrid.appendChild(card);
    });
}

function populateCategories(categories) {
    categoryFilters.innerHTML = '';
    const allButton = document.createElement('button');
    allButton.className = 'category-filter selected';
    allButton.textContent = 'All';
    allButton.dataset.category = '';
    categoryFilters.appendChild(allButton);

    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'category-filter';
        button.textContent = category;
        button.dataset.category = category;
        categoryFilters.appendChild(button);
    });
}

function filterAndRender() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = document.querySelector('.category-filter.selected').dataset.category;

    let filteredProducts = allProducts;

    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product =>
            product.title.toLowerCase().includes(searchTerm)
        );
    }

    if (selectedCategory) {
        filteredProducts = filteredProducts.filter(product =>
            product.category === selectedCategory
        );
    }

    renderProducts(filteredProducts);
}

searchInput.addEventListener('input', filterAndRender);
categoryFilters.addEventListener('click', (event) => {
    if (event.target.classList.contains('category-filter')) {
        document.querySelector('.category-filter.selected').classList.remove('selected');
        event.target.classList.add('selected');
        filterAndRender();
    }
});

productsGrid.addEventListener('click', (event) => {
    const target = event.target; // Define 'target' once
    const productId = parseInt(target.dataset.productId, 10);

    if (target.closest('.favorite-btn')) {
        if (favorites.has(productId)) {
            favorites.delete(productId);
            target.classList.remove('favorited');
        } else {
            favorites.add(productId);
            target.classList.add('favorited');
        }
        saveFavorites(favorites);
    }

    if (target.closest('.add-to-cart-btn')) {
        addToCart(productId);
    }
});

init();
