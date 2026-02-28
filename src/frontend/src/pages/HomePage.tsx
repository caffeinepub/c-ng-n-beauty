import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Award, Leaf, Mail, Shield, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import { fallbackBlogPosts, fallbackProducts } from "../data/fallbackData";
import { useAllBlogPosts, useAllProducts } from "../hooks/useQueries";

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const values = [
  {
    icon: Leaf,
    title: "Tự Nhiên",
    description:
      "Mọi sản phẩm đều được chiết xuất từ nguyên liệu thiên nhiên thuần chay, không paraben, không chất độc hại.",
  },
  {
    icon: Award,
    title: "Chất Lượng",
    description:
      "Được kiểm định và chứng nhận bởi các tổ chức uy tín quốc tế. Cam kết đạt chuẩn da liễu.",
  },
  {
    icon: Shield,
    title: "Tin Cậy",
    description:
      "Hơn 50.000 khách hàng tin dùng. Chính sách hoàn tiền 30 ngày nếu không hài lòng.",
  },
];

export default function HomePage() {
  const [email, setEmail] = useState("");
  const { data: products } = useAllProducts();
  const { data: blogPosts } = useAllBlogPosts();

  const displayProducts = (
    products && products.length > 0 ? products : fallbackProducts
  ).slice(0, 4);
  const displayBlogs = (
    blogPosts && blogPosts.length > 0 ? blogPosts : fallbackBlogPosts
  ).slice(0, 3);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success(
      "Cảm ơn bạn đã đăng ký! Chúng tôi sẽ gửi tin tức mới nhất đến bạn.",
    );
    setEmail("");
  };

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative min-h-[560px] md:min-h-[640px] overflow-hidden">
        <img
          src="/assets/generated/hero-beauty.dim_1200x600.jpg"
          alt="Cổ Ngân Beauty - Vẻ Đẹp Tự Nhiên"
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 hero-gradient" />

        <div className="relative z-10 container mx-auto px-4 max-w-6xl h-full flex items-center py-20 md:py-28">
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="max-w-xl"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block font-body text-xs font-medium tracking-[0.25em] uppercase text-primary-foreground/80 mb-4"
            >
              ✦ Thương Hiệu Làm Đẹp Việt Nam
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-4"
            >
              Cổ Ngân
              <br />
              <span className="italic font-serif font-normal">Beauty</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="font-body text-base md:text-lg text-primary-foreground/80 mb-8 leading-relaxed"
            >
              Vẻ Đẹp Tự Nhiên — Tự Tin Tỏa Sáng
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="btn-shine bg-primary-foreground text-primary font-body font-semibold px-7 hover:bg-primary-foreground/90"
              >
                <Link to="/shop">
                  Khám Phá Ngay
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-body font-medium border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link to="/about">Về Chúng Tôi</Link>
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-5 mt-10 pt-8 border-t border-primary-foreground/20"
            >
              {[
                { value: "50K+", label: "Khách hàng" },
                { value: "100%", label: "Tự nhiên" },
                { value: "4.9★", label: "Đánh giá" },
              ].map((stat) => (
                <div key={stat.label} className="text-primary-foreground">
                  <div className="font-display text-xl font-bold">
                    {stat.value}
                  </div>
                  <div className="font-body text-xs text-primary-foreground/70">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Values Strip ──────────────────────────────────── */}
      <section className="bg-secondary/50 border-y border-border py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {values.map((val) => (
              <motion.div
                key={val.title}
                variants={fadeUp}
                className="flex items-start gap-4"
              >
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <val.icon className="h-5 w-5 text-rose" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm text-foreground mb-1">
                    {val.title}
                  </h3>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────────── */}
      <section className="py-20 container mx-auto px-4 max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="font-body text-xs font-medium tracking-[0.2em] uppercase text-rose">
              Sản Phẩm Nổi Bật
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-3">
              Được Yêu Thích Nhất
            </h2>
            <div className="section-divider" />
            <p className="font-body text-sm text-muted-foreground mt-4 max-w-md mx-auto leading-relaxed">
              Những sản phẩm chăm sóc sắc đẹp được hàng nghìn khách hàng tin
              dùng mỗi ngày
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
          >
            {displayProducts.map((product) => (
              <motion.div key={product.id} variants={fadeUp}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="text-center">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="font-body font-medium px-8"
            >
              <Link to="/shop">
                Xem Tất Cả Sản Phẩm
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* ── About Teaser ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-secondary/30 py-20">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-rose translate-x-32 -translate-y-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-gold -translate-x-16 translate-y-16" />
        </div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative">
                <img
                  src="/assets/generated/about-influencer.dim_500x600.jpg"
                  alt="Cổ Ngân - Beauty Influencer"
                  className="rounded-2xl w-full object-cover shadow-beauty-lg"
                  loading="lazy"
                />
                <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-xl p-4 shadow-beauty">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-rose" />
                    </div>
                    <div>
                      <div className="font-display text-sm font-bold text-foreground">
                        Cổ Ngân
                      </div>
                      <div className="font-body text-xs text-muted-foreground">
                        Beauty Expert
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <span className="font-body text-xs font-medium tracking-[0.2em] uppercase text-rose">
                  Câu Chuyện Thương Hiệu
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
                  Đam Mê Vẻ Đẹp
                  <br />
                  <span className="italic font-serif">Từ Thiên Nhiên</span>
                </h2>
              </div>
              <div className="section-divider" style={{ margin: "0" }} />
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Cổ Ngân Beauty ra đời từ niềm đam mê với vẻ đẹp tự nhiên và mong
                muốn giúp mỗi người phụ nữ Việt Nam tự tin tỏa sáng với vẻ đẹp
                riêng của mình.
              </p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Chúng tôi tin rằng vẻ đẹp thực sự đến từ bên trong — từ sự chăm
                sóc, yêu thương bản thân và sử dụng những sản phẩm lành tính,
                thuần tự nhiên.
              </p>
              <Button
                asChild
                size="lg"
                className="btn-shine font-body font-medium bg-primary text-primary-foreground px-7"
              >
                <Link to="/about">
                  Tìm Hiểu Thêm
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Blog ─────────────────────────────────────────── */}
      <section className="py-20 container mx-auto px-4 max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="font-body text-xs font-medium tracking-[0.2em] uppercase text-rose">
              Kiến Thức Làm Đẹp
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-3">
              Blog Mới Nhất
            </h2>
            <div className="section-divider" />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          >
            {displayBlogs.map((post) => (
              <motion.div key={post.id} variants={fadeUp}>
                <BlogCard post={post} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="text-center">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="font-body font-medium px-8"
            >
              <Link to="/blog">
                Đọc Thêm Bài Viết
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Newsletter ────────────────────────────────────── */}
      <section className="newsletter-bg py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary-foreground/10 mb-4">
                <Mail className="h-6 w-6 text-primary-foreground" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">
                Đăng Ký Nhận Ưu Đãi
              </h2>
              <p className="font-body text-sm text-primary-foreground/75 mt-2 leading-relaxed">
                Nhận ngay mã giảm giá 15% cho đơn hàng đầu tiên và cập nhật
                những bí quyết làm đẹp mới nhất từ Cổ Ngân
              </p>
            </motion.div>

            <motion.form
              variants={fadeUp}
              onSubmit={handleNewsletter}
              className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto"
            >
              <Input
                type="email"
                placeholder="Email của bạn..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="font-body bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-primary-foreground/30"
              />
              <Button
                type="submit"
                className="btn-shine bg-primary-foreground text-primary font-body font-semibold hover:bg-primary-foreground/90 shrink-0"
              >
                Đăng Ký
              </Button>
            </motion.form>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
