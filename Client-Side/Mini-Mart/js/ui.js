export function createProductCard(product, isFavorited) {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
        <div class="card-content"> 
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p class="price">$${product.price.toFixed(2)}</p>
            <p>${product.category}</p>
        </div>
        <div class="card-actions">
            <button class="favorite-btn ${isFavorited ? 'favorited' : ''}" data-product-id="${product.id}">
                &#x2665;
            </button>
            <button class="add-to-cart-btn" data-product-id="${product.id}">
                Add to Cart
            </button>
        </div>
    `;

    return card;
}
