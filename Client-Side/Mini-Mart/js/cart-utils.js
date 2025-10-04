import { getCart, saveCart } from './storage.js';

let notificationTimeout;

function showNotification(message) {
    const notificationPopup = document.getElementById('notification-popup');
    if (!notificationPopup) return;

    notificationPopup.textContent = message;
    notificationPopup.classList.add('show');

    clearTimeout(notificationTimeout);

    notificationTimeout = setTimeout(() => {
        notificationPopup.classList.remove('show');
    }, 1500);
}

export function addToCart(productId) {
    let cart = getCart();
    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ productId: productId, qty: 1 });
    }
    
    saveCart(cart);
    console.log('Product added to cart:', cart);
    showNotification('Item added to cart!');
}

