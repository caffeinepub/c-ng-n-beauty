import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useSearch } from "@tanstack/react-router";
import { CheckCircle2, Home, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function OrderConfirmationPage() {
  const { clearCart } = useCart();
  const search = useSearch({ strict: false }) as { orderId?: string };
  const orderId = search.orderId ?? "";

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main>
      <section className="min-h-[80vh] flex items-center justify-center py-16 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-lg w-full text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              type: "spring",
              stiffness: 200,
            }}
            className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-green-50 mb-8 mx-auto"
          >
            <CheckCircle2 className="h-14 w-14 text-green-500" />
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Đặt Hàng Thành Công!
            </h1>
            <p className="font-body text-muted-foreground leading-relaxed mb-6">
              Cảm ơn bạn đã tin tưởng lựa chọn Cổ Ngân Beauty. Đơn hàng của bạn
              đã được tiếp nhận và sẽ được xử lý trong thời gian sớm nhất.
            </p>
          </motion.div>

          {/* Order ID Card */}
          {orderId && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-secondary/50 border border-border rounded-2xl p-5 mb-8"
            >
              <p className="font-body text-xs text-muted-foreground uppercase tracking-widest mb-2">
                Mã Đơn Hàng
              </p>
              <p className="font-display text-lg font-bold text-foreground tracking-wider">
                {orderId}
              </p>
              <Separator className="my-4" />
              <div className="space-y-2 text-left">
                {[
                  {
                    icon: "📧",
                    text: "Email xác nhận đã được gửi đến hộp thư của bạn",
                  },
                  {
                    icon: "🚚",
                    text: "Thời gian giao hàng: 2-5 ngày làm việc",
                  },
                  { icon: "📞", text: "Hotline: 0901 234 567 nếu cần hỗ trợ" },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-2.5">
                    <span className="text-base leading-none mt-0.5">
                      {item.icon}
                    </span>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button
              asChild
              size="lg"
              className="btn-shine bg-primary text-primary-foreground font-body font-semibold px-8"
            >
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Về Trang Chủ
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="font-body font-medium px-8"
            >
              <Link to="/shop">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Tiếp Tục Mua Sắm
              </Link>
            </Button>
          </motion.div>

          {/* Decoration */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="font-body text-xs text-muted-foreground/60 mt-10"
          >
            ✦ Cổ Ngân Beauty — Vẻ Đẹp Tự Nhiên, Tự Tin Tỏa Sáng ✦
          </motion.p>
        </motion.div>
      </section>
    </main>
  );
}
