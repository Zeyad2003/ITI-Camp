import { getFavorites, saveFavorites } from './storage.js';
import { fetchProducts } from './api.js';
import { addToCart } from './cart-utils.js'; // <-- Import the shared cart function
import { createProductCard } from './ui.js';

const productsGrid = document.getElementById('favorite-products');
const loadingIndicator = document.getElementById('loading');
const emptyMessage = document.getElementById('empty-favorites');

let favorites = new Set();
let allProducts = [];

function displayFavorites() {
    const favoriteProducts = allProducts.filter(product => favorites.has(product.id));

    if (favoriteProducts.length === 0) {
        productsGrid.innerHTML = '';
        emptyMessage.style.display = 'block';
        return;
    }

    emptyMessage.style.display = 'none';
    productsGrid.innerHTML = '';
    favoriteProducts.forEach(product => {
        const card = createProductCard(product, true);
        productsGrid.appendChild(card);
    });
}

productsGrid.addEventListener('click', (event) => {
    const target = event.target;
    const productId = parseInt(target.dataset.productId, 10);

    // Handle removing from favorites
    if (target.classList.contains('favorite-btn')) {
        favorites.delete(productId);
        saveFavorites(favorites);
        displayFavorites(); // Re-render the list
    }

    // Handle adding to cart
    if (target.classList.contains('add-to-cart-btn')) {
        addToCart(productId);
    }
});

async function init() {
    loadingIndicator.style.display = 'block';
    productsGrid.innerHTML = '';
    
    favorites = new Set(getFavorites());
    
    try {
        allProducts = await fetchProducts();
        displayFavorites();
    } catch (error) {
        productsGrid.innerHTML = '<p class="error">Failed to load products.</p>';
        console.error(error);
    } finally {
        loadingIndicator.style.display = 'none';
    }
}

init();