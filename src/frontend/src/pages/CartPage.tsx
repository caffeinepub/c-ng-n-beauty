import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Minus,
  Package,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "../context/CartContext";
import { formatVND } from "../lib/format";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartTotal, clearCart } =
    useCart();
  const navigate = useNavigate();

  return (
    <main>
      {/* Page Header */}
      <section className="bg-secondary/40 border-b border-border py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-body text-xs font-medium tracking-[0.2em] uppercase text-rose">
              Mua Sắm
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-2">
              Giỏ Hàng
            </h1>
            <div className="section-divider" />
          </motion.div>
        </div>
      </section>

      <section className="py-12 container mx-auto px-4 max-w-6xl">
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 gap-5"
          >
            <div className="h-24 w-24 rounded-full bg-secondary/60 flex items-center justify-center">
              <ShoppingBag className="h-11 w-11 text-muted-foreground/40" />
            </div>
            <div className="text-center">
              <p className="font-display text-2xl font-bold text-foreground mb-2">
                Giỏ hàng trống
              </p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-sm">
                Bạn chưa có sản phẩm nào trong giỏ hàng. Khám phá những sản phẩm
                làm đẹp tuyệt vời của chúng tôi!
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="btn-shine bg-primary text-primary-foreground font-body font-semibold mt-2 px-8"
            >
              <Link to="/shop">Khám Phá Cửa Hàng</Link>
            </Button>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Cart Items */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold text-foreground">
                  {items.length} sản phẩm
                </h2>
                <button
                  type="button"
                  onClick={clearCart}
                  className="font-body text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1.5"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Xóa tất cả
                </button>
              </div>

              {/* Header Row */}
              <div className="hidden md:grid grid-cols-[1fr_auto_auto] gap-4 pb-3 border-b border-border mb-2">
                <span className="font-body text-xs text-muted-foreground uppercase tracking-wide">
                  Sản phẩm
                </span>
                <span className="font-body text-xs text-muted-foreground uppercase tracking-wide w-28 text-center">
                  Số lượng
                </span>
                <span className="font-body text-xs text-muted-foreground uppercase tracking-wide w-28 text-right">
                  Thành tiền
                </span>
              </div>

              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 items-center py-5 border-b border-border/60"
                  >
                    {/* Product Info */}
                    <div className="flex gap-4 items-center">
                      <div className="h-20 w-20 shrink-0 rounded-xl overflow-hidden bg-secondary/30 border border-border">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-body font-semibold text-sm text-foreground leading-tight mb-1">
                          {item.name}
                        </p>
                        <p className="font-display text-sm font-bold text-rose md:hidden">
                          {formatVND(item.price)}
                        </p>
                        <p className="font-body text-xs text-muted-foreground hidden md:block mt-1">
                          Đơn giá: {formatVND(item.price)}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 md:w-28 md:justify-center">
                      <div className="flex items-center border border-border rounded-lg overflow-hidden">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="h-8 w-8 flex items-center justify-center text-foreground/70 hover:bg-secondary/60 transition-colors"
                          aria-label="Giảm số lượng"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="h-8 w-10 flex items-center justify-center font-body text-sm font-medium text-foreground border-x border-border">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="h-8 w-8 flex items-center justify-center text-foreground/70 hover:bg-secondary/60 transition-colors"
                          aria-label="Tăng số lượng"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors rounded md:hidden"
                        aria-label={`Xóa ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Line Total */}
                    <div className="hidden md:flex items-center justify-end gap-4 w-28">
                      <span className="font-display text-sm font-bold text-foreground">
                        {formatVND(item.price * item.quantity)}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors rounded"
                        aria-label={`Xóa ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Back to Shopping */}
              <div className="mt-8">
                <Button
                  asChild
                  variant="ghost"
                  className="font-body text-sm text-muted-foreground hover:text-foreground gap-2 px-0"
                >
                  <Link to="/shop">
                    <ArrowLeft className="h-4 w-4" />
                    Tiếp Tục Mua Sắm
                  </Link>
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-80 shrink-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-card border border-border rounded-2xl p-6 sticky top-24"
              >
                <h2 className="font-display text-lg font-bold text-foreground mb-5 flex items-center gap-2">
                  <Package className="h-5 w-5 text-rose" />
                  Tóm Tắt Đơn Hàng
                </h2>

                <div className="space-y-3 mb-5">
                  <div className="flex items-center justify-between">
                    <span className="font-body text-sm text-muted-foreground">
                      Tạm tính
                    </span>
                    <span className="font-body text-sm font-medium text-foreground">
                      {formatVND(cartTotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-body text-sm text-muted-foreground">
                      Phí vận chuyển
                    </span>
                    <span className="font-body text-sm font-medium text-green-600">
                      Miễn phí
                    </span>
                  </div>
                </div>

                <Separator className="mb-5" />

                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-base font-bold text-foreground">
                    Tổng cộng
                  </span>
                  <span className="font-display text-xl font-bold text-rose">
                    {formatVND(cartTotal)}
                  </span>
                </div>

                <Button
                  className="w-full btn-shine bg-primary text-primary-foreground font-body font-semibold h-11"
                  onClick={() => navigate({ to: "/checkout" })}
                >
                  Thanh Toán
                </Button>

                <p className="font-body text-xs text-muted-foreground text-center mt-4 leading-relaxed">
                  🔒 Thanh toán an toàn và bảo mật
                </p>
              </motion.div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
