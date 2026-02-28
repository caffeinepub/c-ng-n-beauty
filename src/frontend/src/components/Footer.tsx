import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { SiFacebook, SiInstagram, SiTiktok } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 max-w-6xl py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <img
              src="/assets/generated/logo-co-ngan-transparent.dim_300x100.png"
              alt="Cổ Ngân Beauty"
              className="h-12 w-auto object-contain brightness-200 saturate-0 invert"
            />
            <p className="text-sm text-primary-foreground/70 leading-relaxed font-body">
              Vẻ đẹp tự nhiên — tự tin tỏa sáng. Cổ Ngân Beauty cam kết mang đến
              những sản phẩm làm đẹp chất lượng cao từ thiên nhiên Việt Nam.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                <SiFacebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                <SiTiktok className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-primary-foreground/50 mb-5">
              Khám Phá
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/shop", label: "Cửa Hàng" },
                { href: "/blog", label: "Blog Làm Đẹp" },
                { href: "/about", label: "Giới Thiệu" },
                { href: "/contact", label: "Liên Hệ" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm font-body text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-primary-foreground/50 mb-5">
              Liên Hệ
            </h3>
            <ul className="space-y-3 text-sm font-body text-primary-foreground/70">
              <li>📍 123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</li>
              <li>📧 hello@conganbeauty.vn</li>
              <li>📞 0901 234 567</li>
              <li>🕐 Thứ 2 – Thứ 7: 9:00 – 18:00</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-body text-primary-foreground/50">
            © {year} Cổ Ngân Beauty. All rights reserved.
          </p>
          <p className="text-xs font-body text-primary-foreground/50 flex items-center gap-1">
            Built with <Heart className="h-3 w-3 fill-current text-rose-400" />{" "}
            using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary-foreground/80 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
