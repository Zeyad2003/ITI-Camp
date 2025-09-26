import { getCart, saveCart } from './storage.js';
import { fetchProducts } from './api.js';

// DOM Elements
const summaryContainer = document.getElementById('order-summary');
const form = document.getElementById('checkout-form');
const loadingIndicator = document.getElementById('loading');
const mainContent = document.getElementById('checkout-main');
const successMessage = document.getElementById('success-message');

async function init() {
    loadingIndicator.style.display = 'block';
    const cart = getCart();

    if (cart.length === 0) {
        loadingIndicator.style.display = 'none';
        summaryContainer.innerHTML = '<p>Your cart is empty. Nothing to check out!</p>';
        form.style.display = 'none'; // Hide form if cart is empty
        return;
    }

    try {
        const allProducts = await fetchProducts();
        displayOrderSummary(cart, allProducts);
    } catch (error) {
        summaryContainer.innerHTML = '<p class="error">Could not load order summary.</p>';
        console.error(error);
    } finally {
        loadingIndicator.style.display = 'none';
    }
}

function displayOrderSummary(cart, allProducts) {
    let total = 0;
    summaryContainer.innerHTML = '<h3>Order Summary</h3>';
    const ul = document.createElement('ul');

    cart.forEach(item => {
        const product = allProducts.find(p => p.id === item.productId);
        if (!product) return;

        total += product.price * item.qty;
        const li = document.createElement('li');
        li.className = 'summary-item';
        li.innerHTML = `
            <span>${item.qty} x ${product.title}</span>
            <strong>$${(product.price * item.qty).toFixed(2)}</strong>
        `;
        ul.appendChild(li);
    });

    const totalElement = document.createElement('p');
    totalElement.className = 'summary-total';
    totalElement.innerHTML = `Total: <strong>$${total.toFixed(2)}</strong>`;

    summaryContainer.appendChild(ul);
    summaryContainer.appendChild(totalElement);
}

// Form validation and submission
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    // Basic validation
    const name = form.elements['name'].value.trim();
    const email = form.elements['email'].value.trim();
    const address = form.elements['address'].value.trim();

    if (!name || !email || !address) {
        alert('Please fill out all fields.');
        return;
    }

    // Simulate order submission
    console.log('Order submitted:', { name, email, address, cart: getCart() });

    // Clear the cart
    saveCart([]);

    // Show success message
    mainContent.style.display = 'none';
    successMessage.style.display = 'block';
});

init();