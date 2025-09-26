import { getCart, saveCart } from './storage.js';
import { fetchProducts } from './api.js';

const cartContainer = document.getElementById('cart-items-container');
const loadingIndicator = document.getElementById('loading');
const emptyCartMessage = document.getElementById('empty-cart');
const cartSummary = document.getElementById('cart-summary');
const cartTotalElement = document.getElementById('cart-total');

let cart = [];
let allProducts = [];

async function init() {
    loadingIndicator.style.display = 'block';
    cart = getCart();
    
    if (cart.length === 0) {
        showEmptyCart();
        return;
    }

    try {
        allProducts = await fetchProducts();
        renderCart();
    } catch (error) {
        cartContainer.innerHTML = `<p class="error">Could not load cart items.</p>`;
        console.error(error);
    } finally {
        loadingIndicator.style.display = 'none';
    }
}

function renderCart() {
    if (cart.length === 0) {
        showEmptyCart();
        return;
    }

    cartContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const product = allProducts.find(p => p.id === item.productId);
        if (!product) return;

        const subtotal = product.price * item.qty;
        total += subtotal;

        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <div class="cart-item-details">
                <h3>${product.title}</h3>
                <p>$${product.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-actions">
                <button data-id="${item.productId}" class="qty-btn decrease-qty">-</button>
                <input type="number" class="qty-input" value="${item.qty}" min="1" data-id="${item.productId}">
                <button data-id="${item.productId}" class="qty-btn increase-qty">+</button>
            </div>
            <p class="cart-item-subtotal">$${subtotal.toFixed(2)}</p>
            <button data-id="${item.productId}" class="remove-item-btn">&times;</button>
        `;
        cartContainer.appendChild(itemElement);
    });

    cartTotalElement.textContent = `$${total.toFixed(2)}`;
    cartSummary.style.display = 'block';
}

function updateCart(productId, newQty) {
    const itemInCart = cart.find(item => item.productId === productId);
    if (!itemInCart) return;

    if (newQty > 0) {
        itemInCart.qty = newQty;
    } else {
        cart = cart.filter(item => item.productId !== productId);
    }
    
    saveCart(cart);
    renderCart();
}

function showEmptyCart() {
    loadingIndicator.style.display = 'none';
    cartContainer.innerHTML = '';
    cartSummary.style.display = 'none';
    emptyCartMessage.style.display = 'block';
}

cartContainer.addEventListener('click', (event) => {
    const target = event.target;
    const productId = parseInt(target.dataset.id);
    if (!productId) return;

    const item = cart.find(i => i.productId === productId);
    if (!item) return;

    if (target.classList.contains('increase-qty')) {
        updateCart(productId, item.qty + 1);
    } else if (target.classList.contains('decrease-qty')) {
        updateCart(productId, item.qty - 1);
    } else if (target.classList.contains('remove-item-btn')) {
        updateCart(productId, 0); // Setting qty to 0 removes the item
    }
});

cartContainer.addEventListener('change', (event) => {
    if (event.target.classList.contains('qty-input')) {
        const productId = parseInt(event.target.dataset.id);
        const newQty = parseInt(event.target.value);
        if (newQty > 0) {
            updateCart(productId, newQty);
        }
    }
});

const checkoutBtn = document.getElementById('proceed-checkout-btn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        window.location.href = 'checkout.html';
    });
}

init();
