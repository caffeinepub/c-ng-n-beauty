import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, Package, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { usePlaceOrder } from "../hooks/useQueries";
import { formatVND } from "../lib/format";

function generateId(): string {
  return `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

interface FormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
}

const initialForm: FormData = {
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  customerAddress: "",
};

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const placeOrder = usePlaceOrder();
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.customerName.trim())
      newErrors.customerName = "Vui lòng nhập họ và tên";
    if (!form.customerEmail.trim())
      newErrors.customerEmail = "Vui lòng nhập email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.customerEmail))
      newErrors.customerEmail = "Email không hợp lệ";
    if (!form.customerPhone.trim())
      newErrors.customerPhone = "Vui lòng nhập số điện thoại";
    else if (!/^[0-9+\s-]{9,15}$/.test(form.customerPhone.trim()))
      newErrors.customerPhone = "Số điện thoại không hợp lệ";
    if (!form.customerAddress.trim())
      newErrors.customerAddress = "Vui lòng nhập địa chỉ giao hàng";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error("Giỏ hàng trống. Vui lòng thêm sản phẩm trước khi đặt hàng.");
      return;
    }

    if (!validate()) return;

    const orderId = generateId();

    try {
      await placeOrder.mutateAsync({
        id: orderId,
        customerName: form.customerName,
        customerEmail: form.customerEmail,
        customerPhone: form.customerPhone,
        customerAddress: form.customerAddress,
        totalAmount: cartTotal,
        status: "pending",
        createdAt: BigInt(Date.now()),
        items: items.map((item) => ({
          productId: item.id,
          productName: item.name,
          quantity: BigInt(item.quantity),
          price: item.price,
        })),
      });

      clearCart();
      navigate({ to: "/order-confirmation", search: { orderId } });
    } catch (err) {
      console.error("Order placement error:", err);
      toast.error("Có lỗi khi đặt hàng. Vui lòng thử lại sau.");
    }
  };

  if (items.length === 0 && !placeOrder.isSuccess) {
    return (
      <main>
        <section className="py-24 container mx-auto px-4 max-w-6xl text-center">
          <Package className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Giỏ hàng trống
          </h1>
          <p className="font-body text-muted-foreground mb-6">
            Bạn cần thêm sản phẩm vào giỏ hàng trước khi thanh toán.
          </p>
          <Button
            className="btn-shine bg-primary text-primary-foreground font-body"
            onClick={() => navigate({ to: "/shop" })}
          >
            Về Cửa Hàng
          </Button>
        </section>
      </main>
    );
  }

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
              Đặt Hàng
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-2">
              Thanh Toán
            </h1>
            <div className="section-divider" />
          </motion.div>
        </div>
      </section>

      <section className="py-12 container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Customer Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <h2 className="font-display text-xl font-bold text-foreground mb-6">
              Thông Tin Giao Hàng
            </h2>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Full Name */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="customerName"
                  className="font-body text-sm font-medium text-foreground"
                >
                  Họ và Tên <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="customerName"
                  name="customerName"
                  value={form.customerName}
                  onChange={handleChange}
                  placeholder="Nguyễn Văn A"
                  className={`font-body h-11 ${errors.customerName ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  disabled={placeOrder.isPending}
                />
                {errors.customerName && (
                  <p className="font-body text-xs text-destructive">
                    {errors.customerName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="customerEmail"
                  className="font-body text-sm font-medium text-foreground"
                >
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="customerEmail"
                  name="customerEmail"
                  type="email"
                  value={form.customerEmail}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className={`font-body h-11 ${errors.customerEmail ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  disabled={placeOrder.isPending}
                />
                {errors.customerEmail && (
                  <p className="font-body text-xs text-destructive">
                    {errors.customerEmail}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="customerPhone"
                  className="font-body text-sm font-medium text-foreground"
                >
                  Số Điện Thoại <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="customerPhone"
                  name="customerPhone"
                  type="tel"
                  value={form.customerPhone}
                  onChange={handleChange}
                  placeholder="0901 234 567"
                  className={`font-body h-11 ${errors.customerPhone ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  disabled={placeOrder.isPending}
                />
                {errors.customerPhone && (
                  <p className="font-body text-xs text-destructive">
                    {errors.customerPhone}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="customerAddress"
                  className="font-body text-sm font-medium text-foreground"
                >
                  Địa Chỉ Giao Hàng <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="customerAddress"
                  name="customerAddress"
                  value={form.customerAddress}
                  onChange={handleChange}
                  placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                  rows={3}
                  className={`font-body resize-none ${errors.customerAddress ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  disabled={placeOrder.isPending}
                />
                {errors.customerAddress && (
                  <p className="font-body text-xs text-destructive">
                    {errors.customerAddress}
                  </p>
                )}
              </div>

              {/* Security Badge */}
              <div className="flex items-center gap-3 p-4 bg-secondary/40 rounded-xl border border-border">
                <ShieldCheck className="h-5 w-5 text-green-600 shrink-0" />
                <p className="font-body text-xs text-muted-foreground leading-relaxed">
                  Thông tin của bạn được bảo mật hoàn toàn. Chúng tôi không lưu
                  trữ thông tin thẻ thanh toán.
                </p>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full btn-shine bg-primary text-primary-foreground font-body font-semibold h-12 text-base mt-2"
                disabled={placeOrder.isPending}
              >
                {placeOrder.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Đang xử lý đơn hàng...
                  </>
                ) : (
                  "Đặt Hàng"
                )}
              </Button>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:w-96 shrink-0"
          >
            <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
              <h2 className="font-display text-lg font-bold text-foreground mb-5 flex items-center gap-2">
                <Package className="h-5 w-5 text-rose" />
                Tóm Tắt Đơn Hàng
              </h2>

              {/* Item List */}
              <div className="space-y-4 mb-5 max-h-72 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <div className="h-14 w-14 rounded-lg overflow-hidden bg-secondary/30 border border-border">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-body font-semibold flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm font-medium text-foreground line-clamp-2 leading-tight">
                        {item.name}
                      </p>
                    </div>
                    <span className="font-display text-sm font-bold text-foreground shrink-0">
                      {formatVND(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <Separator className="mb-5" />

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

              <div className="flex items-center justify-between">
                <span className="font-display text-base font-bold text-foreground">
                  Tổng cộng
                </span>
                <span className="font-display text-2xl font-bold text-rose">
                  {formatVND(cartTotal)}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
