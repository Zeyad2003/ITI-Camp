// api.js — minimal API client for Fake Store API
const BASE = 'https://fakestoreapi.com';

async function http(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function fetchProducts() {
  return http('/products');
}

export async function fetchCategories() {
  return http('/products/categories');
}
