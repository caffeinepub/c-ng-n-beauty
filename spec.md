# Cổ Ngân Beauty

## Current State
- Full beauty website with 5 pages: Home, Shop, Blog, About, Contact
- Backend has: Products, BlogPosts, ContactMessages stored in Motoko
- Frontend has a basic cart state in App.tsx (CartItem array, handleAddToCart), passed to Header as `cartItems`
- Header shows shopping bag icon with item count badge
- Cart icon currently links back to /shop — no cart drawer or checkout flow exists
- No order/checkout backend

## Requested Changes (Diff)

### Add
- Backend: `Order` type with fields: id, customerName, customerEmail, customerPhone, customerAddress, items (array of OrderItem: productId, productName, price, quantity), totalAmount, status, createdAt
- Backend: `OrderItem` type
- Backend: `placeOrder(order: Order)` update function
- Backend: `getOrders()` query function
- Frontend: Cart context/provider to manage cart state globally (replacing the current module-level globalAddToCart hack)
- Frontend: `CartDrawer` component -- slide-in panel from the right showing cart items, quantities, subtotal, and a "Proceed to Checkout" button
- Frontend: `/cart` route and `CartPage` showing full cart summary with ability to edit quantities and remove items
- Frontend: `/checkout` route and `CheckoutPage` with a form: customer name, email, phone, delivery address, and order summary; submit calls `placeOrder`
- Frontend: `/order-confirmation` route and `OrderConfirmationPage` showing order success with order ID and summary
- Frontend: Cart icon in Header opens CartDrawer (not navigates to /shop)

### Modify
- `App.tsx`: Replace module-level globalAddToCart hack with React Context for cart state; add new routes for /cart, /checkout, /order-confirmation
- `Header.tsx`: Cart icon opens CartDrawer instead of linking to /shop
- `ShopPage.tsx` and `HomePage.tsx`: Use cart context instead of prop drilling
- `ProductCard.tsx`: Optionally use cart context directly

### Remove
- Module-level `globalAddToCart` hack in App.tsx

## Implementation Plan
1. Update `main.mo` to add Order/OrderItem types, `placeOrder`, and `getOrders` functions
2. Generate new backend bindings (backend.d.ts)
3. Create CartContext with useCart hook (add, remove, update qty, clear)
4. Build CartDrawer component (Sheet/Drawer sliding from right)
5. Build CartPage (/cart) with editable quantities and remove items
6. Build CheckoutPage (/checkout) with customer form + order summary, calls placeOrder
7. Build OrderConfirmationPage (/order-confirmation) showing success + order details
8. Update App.tsx: wrap with CartProvider, add new routes, remove globalAddToCart hack
9. Update Header.tsx: cart icon opens CartDrawer
10. Update ShopPage, HomePage, ProductCard to use useCart() hook
