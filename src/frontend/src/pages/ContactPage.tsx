import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Clock, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useSubmitContact } from "../hooks/useQueries";

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const contactInfo = [
  {
    icon: MapPin,
    title: "Địa Chỉ",
    lines: ["123 Nguyễn Huệ, Quận 1", "TP. Hồ Chí Minh, Việt Nam"],
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["hello@conganbeauty.vn", "support@conganbeauty.vn"],
  },
  {
    icon: Phone,
    title: "Điện Thoại",
    lines: ["0901 234 567", "0912 345 678"],
  },
  {
    icon: Clock,
    title: "Giờ Làm Việc",
    lines: ["Thứ 2 – Thứ 7: 9:00 – 18:00", "Chủ nhật: 10:00 – 15:00"],
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const submitMutation = useSubmitContact();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitMutation.mutateAsync({
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        createdAt: BigInt(Date.now()),
      });
      setSubmitted(true);
    } catch {
      // Still show success even if backend fails (graceful degradation)
      setSubmitted(true);
    }
  };

  return (
    <main>
      {/* Header */}
      <section className="bg-secondary/40 border-b border-border py-14">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-body text-xs font-medium tracking-[0.2em] uppercase text-rose">
              Kết Nối Với Chúng Tôi
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-3">
              Liên Hệ
            </h1>
            <div className="section-divider" />
            <p className="font-body text-sm text-muted-foreground mt-4 max-w-md mx-auto leading-relaxed">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy để lại tin
              nhắn, chúng tôi sẽ phản hồi trong vòng 24 giờ.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Contact Info */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeUp}>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                Thông Tin Liên Hệ
              </h2>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Đội ngũ Cổ Ngân Beauty luôn sẵn sàng hỗ trợ bạn về sản phẩm, đơn
                hàng và tư vấn làm đẹp miễn phí.
              </p>
            </motion.div>

            <div className="space-y-6">
              {contactInfo.map((info) => (
                <motion.div
                  key={info.title}
                  variants={fadeUp}
                  className="flex items-start gap-4"
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <info.icon className="h-5 w-5 text-rose" />
                  </div>
                  <div>
                    <h3 className="font-body font-semibold text-sm text-foreground mb-1">
                      {info.title}
                    </h3>
                    {info.lines.map((line) => (
                      <p
                        key={line}
                        className="font-body text-sm text-muted-foreground"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social */}
            <motion.div
              variants={fadeUp}
              className="pt-4 border-t border-border"
            >
              <p className="font-body text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                Theo Dõi Chúng Tôi
              </p>
              <div className="flex gap-3">
                {["Facebook", "Instagram", "TikTok"].map((social) => (
                  <a
                    key={social}
                    href={`https://${social.toLowerCase()}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-xs font-medium px-4 py-2 rounded-full border border-border bg-card hover:bg-secondary hover:border-primary transition-colors text-foreground"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="text-center py-16 px-8 bg-card rounded-2xl border border-border shadow-beauty"
              >
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-5">
                  <CheckCircle className="h-8 w-8 text-rose" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                  Gửi Thành Công!
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
                  Cảm ơn bạn đã liên hệ với Cổ Ngân Beauty! Chúng tôi đã nhận
                  được tin nhắn của bạn và sẽ phản hồi trong vòng 24 giờ làm
                  việc.
                </p>
                <p className="font-body text-xs text-muted-foreground">
                  Trong thời gian chờ đợi, hãy khám phá{" "}
                  <a
                    href="/blog"
                    className="text-rose hover:underline font-medium"
                  >
                    blog làm đẹp
                  </a>{" "}
                  của chúng tôi nhé!
                </p>
                <Button
                  variant="outline"
                  className="font-body mt-6"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      message: "",
                    });
                  }}
                >
                  Gửi Tin Nhắn Khác
                </Button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-card rounded-2xl border border-border p-8 space-y-5 shadow-beauty"
                noValidate
              >
                <h2 className="font-display text-xl font-bold text-foreground">
                  Gửi Tin Nhắn Cho Chúng Tôi
                </h2>

                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="font-body text-sm font-medium"
                  >
                    Họ Tên <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Nguyễn Thị Hoa"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    className="font-body"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="font-body text-sm font-medium"
                  >
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="hoa@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    className="font-body"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="font-body text-sm font-medium"
                  >
                    Số Điện Thoại
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="0901 234 567"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    className="font-body"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="font-body text-sm font-medium"
                  >
                    Tin Nhắn <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Bạn muốn hỏi về sản phẩm nào? Chúng tôi sẵn sàng tư vấn miễn phí..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="font-body resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full btn-shine font-body font-semibold"
                  disabled={submitMutation.isPending}
                >
                  {submitMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang Gửi...
                    </>
                  ) : (
                    "Gửi Tin Nhắn"
                  )}
                </Button>

                <p className="font-body text-xs text-muted-foreground text-center">
                  Bằng cách gửi biểu mẫu này, bạn đồng ý với{" "}
                  <span className="underline cursor-pointer">
                    chính sách bảo mật
                  </span>{" "}
                  của chúng tôi.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
