import { Toaster } from "@/components/ui/sonner";
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useState } from "react";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { CartProvider } from "./context/CartContext";
import AboutPage from "./pages/AboutPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import BlogPage from "./pages/BlogPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import ShopPage from "./pages/ShopPage";

function Layout() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onOpenCart={() => setCartOpen(true)} />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <Toaster richColors position="top-right" />
    </div>
  );
}

// Root route with layout
const rootRoute = createRootRoute({
  component: Layout,
  notFoundComponent: () => (
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <p className="font-display text-2xl font-bold text-foreground">
        Không Tìm Thấy Trang
      </p>
      <Link to="/" className="text-sm text-rose underline font-body">
        Về Trang Chủ
      </Link>
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const shopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shop",
  component: ShopPage,
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: BlogPage,
});

const blogDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/$id",
  component: BlogDetailPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: CartPage,
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: CheckoutPage,
});

const orderConfirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order-confirmation",
  component: OrderConfirmationPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  shopRoute,
  blogRoute,
  blogDetailRoute,
  aboutRoute,
  contactRoute,
  cartRoute,
  checkoutRoute,
  orderConfirmationRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}
