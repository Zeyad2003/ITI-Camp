const API_URL = 'https://fakestoreapi.com';

export async function fetchProducts() {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json();
}

export async function fetchCategories() {
    const response = await fetch(`${API_URL}/products/categories`);
    if (!response.ok) {
        throw new Error('Failed to fetch categories');
    }
    return response.json();
}
