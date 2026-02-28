import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNavigate } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "../context/CartContext";
import { formatVND } from "../lib/format";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate({ to: "/checkout" });
  };

  const handleContinueShopping = () => {
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 flex flex-col"
      >
        {/* Header */}
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
          <SheetTitle className="font-display text-xl font-bold text-foreground flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-rose" />
            Giỏ Hàng
            {items.length > 0 && (
              <Badge className="ml-auto bg-primary text-primary-foreground text-xs font-body">
                {items.length} sản phẩm
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        {/* Body */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 py-16">
            <div className="h-20 w-20 rounded-full bg-secondary/60 flex items-center justify-center">
              <ShoppingBag className="h-9 w-9 text-muted-foreground/40" />
            </div>
            <p className="font-display text-lg font-semibold text-foreground">
              Giỏ hàng trống
            </p>
            <p className="font-body text-sm text-muted-foreground text-center leading-relaxed">
              Bạn chưa có sản phẩm nào trong giỏ hàng. Khám phá cửa hàng của
              chúng tôi!
            </p>
            <Button
              variant="outline"
              className="font-body mt-2"
              onClick={handleContinueShopping}
            >
              Tiếp Tục Mua Sắm
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6">
              <div className="py-4 space-y-4">
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex gap-4 py-3"
                    >
                      {/* Product Image */}
                      <div className="h-18 w-18 shrink-0 rounded-lg overflow-hidden bg-secondary/30 border border-border">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-full w-full object-cover"
                          style={{ height: "72px", width: "72px" }}
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm font-medium text-foreground leading-tight line-clamp-2 mb-2">
                          {item.name}
                        </p>
                        <p className="font-display text-sm font-bold text-rose mb-3">
                          {formatVND(item.price)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center border border-border rounded-lg overflow-hidden">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="h-7 w-7 flex items-center justify-center text-foreground/70 hover:bg-secondary/60 transition-colors"
                              aria-label="Giảm số lượng"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="h-7 w-8 flex items-center justify-center font-body text-sm font-medium text-foreground border-x border-border">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="h-7 w-7 flex items-center justify-center text-foreground/70 hover:bg-secondary/60 transition-colors"
                              aria-label="Tăng số lượng"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto h-7 w-7 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors rounded"
                            aria-label={`Xóa ${item.name} khỏi giỏ`}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </ScrollArea>

            {/* Subtotal + Actions */}
            <SheetFooter className="flex-col gap-0 px-6 pt-4 pb-6 border-t border-border">
              <div className="flex items-center justify-between mb-1">
                <span className="font-body text-sm text-muted-foreground">
                  Tạm tính
                </span>
                <span className="font-display text-base font-bold text-foreground">
                  {formatVND(cartTotal)}
                </span>
              </div>
              <p className="font-body text-xs text-muted-foreground mb-4">
                Phí vận chuyển sẽ được tính khi thanh toán
              </p>

              <Separator className="mb-4" />

              <Button
                className="w-full btn-shine bg-primary text-primary-foreground font-body font-semibold h-11 mb-2"
                onClick={handleCheckout}
              >
                Tiến Hành Thanh Toán
              </Button>
              <Button
                variant="outline"
                className="w-full font-body h-10"
                onClick={handleContinueShopping}
              >
                Tiếp Tục Mua Sắm
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
