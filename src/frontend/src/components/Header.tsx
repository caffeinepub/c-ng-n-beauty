import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

interface HeaderProps {
  onOpenCart: () => void;
}

const navLinks = [
  { href: "/", label: "Trang Chủ" },
  { href: "/shop", label: "Cửa Hàng" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "Giới Thiệu" },
  { href: "/contact", label: "Liên Hệ" },
];

export default function Header({ onOpenCart }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img
              src="/assets/generated/logo-co-ngan-transparent.dim_300x100.png"
              alt="Cổ Ngân Beauty"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`nav-link font-body text-sm font-medium tracking-wide text-foreground/80 hover:text-foreground transition-colors ${
                  pathname === link.href ? "active text-foreground" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Cart + Mobile Menu */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={onOpenCart}
              aria-label={`Giỏ hàng (${cartCount} sản phẩm)`}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1.5 -right-1.5 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground">
                  {cartCount}
                </Badge>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <nav
            className="md:hidden py-4 border-t border-border"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className={`block px-4 py-3 font-body font-medium text-sm rounded-md transition-colors ${
                      pathname === link.href
                        ? "bg-secondary text-foreground"
                        : "text-foreground/80 hover:bg-secondary/60 hover:text-foreground"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
