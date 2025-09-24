// storage.js — localStorage helpers and keys
export const STORAGE_KEYS = Object.freeze({
  favorites: 'mm_favorites',
  cart: 'mm_cart'
});

export function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota errors in this scope
  }
}
