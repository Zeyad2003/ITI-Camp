# MiniMart – Client-Side E‑Commerce (Vanilla JS)

This plan breaks the work into 4 phases, one page per phase, aligned with the requirements. No frameworks, no Bootstrap. We’ll use HTML + CSS (flexbox/grid) + vanilla JS with the Fetch API and localStorage.

## Tech stack and conventions

- HTML: semantic structure per page
- CSS: mobile-first, CSS variables, flexbox/grid for layout
- JS: vanilla ES modules (type="module"), no bundler
- State persistence: localStorage (keys are namespaced under `mm_*`)
- API: Fake Store API (https://fakestoreapi.com/)
- Accessibility: labels for inputs, buttons with discernible text, alt text for images
- Error handling: visible error message with retry
- File structure (incrementally filled as phases progress):

```
Client-Side/
  Mini-Mart Project/
    index.html                 # Phase 1: Product Listing
    favorites.html             # Phase 2: Favorites (later)
    cart.html                  # Phase 3: Cart (later)
    checkout.html              # Phase 4: Checkout (later)
    styles.css                 # Global styles + page-specific sections
    app.js                     # Page bootstrap (routing-free, per page logic)
    api.js                     # API client (fetch wrappers)
    storage.js                 # localStorage helpers + keys
    PLAN.md                    # This plan
```

## Data model (client-side)

- Product (as returned by Fake Store API): `{ id, title, price, description, category, image, rating }`
- Favorites (Phase 2): `Set<number>` of product IDs stored in localStorage under `mm_favorites`
- Cart (Phase 3): `Array<{ productId: number, qty: number }>` stored under `mm_cart`

## localStorage keys

- `mm_favorites` → JSON array of product IDs
- `mm_cart` → JSON array of cart line objects

## Navigation

- Separate HTML files for each page (no client-side router needed)
- Minimal header with links to the 4 pages (non-existent pages will be added in subsequent phases)

---

## Phase 1 — Product Listing Page

Goal: Implement product catalog with fetch, grid layout, category filtering, and search.

Deliverables:
- `index.html` with:
  - Header: brand/title + nav (links to Favorites, Cart, Checkout)
  - Filters: search input (by name/title), category dropdown
  - Results grid: product card (image, title, price, category)
  - Loading spinner while fetching
  - Error state with retry
- `styles.css`: responsive layout using CSS grid, mobile-first
- `api.js`: fetch products and categories
- `app.js`: page logic for Phase 1 (fetch + render + filter + search)
- `storage.js`: helper functions and reserved keys (used from Phase 2+)

User stories covered:
- As a user, I can see products with image, title, price, and category
- As a user, I can filter by category
- As a user, I can search by product name (title)

Edge cases:
- Slow network → show spinner
- API failure → error message with retry button
- No match after filtering/search → show friendly empty state

Acceptance criteria:
- Products load from the API and render in a responsive grid
- Search and category filter work together and update instantly
- No runtime errors in console

---

## Phase 2 — Favorites Page

Goal: Allow users to favorite products and view/remove them on a dedicated page.

Deliverables:
- `favorites.html` and favorites logic in `app.js` or a small `favorites.js`
- Heart icon in product cards (in listing) to toggle favorite
- Persist favorites in `localStorage` (`mm_favorites`)
- Favorites page lists favorited items; allow unfavorite

Acceptance criteria:
- Toggling favorites updates UI and persists across reloads
- Favorites page shows and removes items correctly

---

## Phase 3 — Cart Page

Goal: Add a cart with quantity management and price totals.

Deliverables:
- `cart.html` and cart logic in `app.js` or a small `cart.js`
- Add-to-cart on listing (button on each card)
- Cart page shows items: title, price, quantity, subtotal, and total
- Update quantity and remove items
- Persist in `localStorage` (`mm_cart`)

Acceptance criteria:
- Cart survives reloads
- Totals are correct and update when quantities change

---

## Phase 4 — Checkout Page

Goal: Simple checkout form + summary with client-side validation.

Deliverables:
- `checkout.html`
- Show cart summary
- Form with name, email, address; basic validation
- Simulate submit (clear cart and show success UI)

Acceptance criteria:
- Invalid inputs show inline messages; valid submission shows success and clears cart

---

## Non-functional and quality gates

- Mobile-first, works on narrow screens
- Uses only vanilla JS and CSS (no frameworks)
- Reasonable ARIA/labels/alt attributes
- No blocking errors on console
- Files organized with separation of concerns

## Nice-to-haves (Optional bonuses)

- Debounced search input
- Price range filter
- Dark mode toggle (CSS variables + toggle stored in localStorage)
- Pagination or lazy loading
