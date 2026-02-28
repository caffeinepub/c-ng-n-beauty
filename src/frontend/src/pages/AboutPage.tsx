import { Award, Heart, Leaf, Shield, Star, Users } from "lucide-react";
import { motion } from "motion/react";

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
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
      "Chúng tôi cam kết chỉ sử dụng nguyên liệu từ thiên nhiên, không hóa chất độc hại, không paraben, không silicon nhân tạo. Mỗi sản phẩm là tinh hoa của thiên nhiên Việt Nam.",
  },
  {
    icon: Award,
    title: "Chất Lượng",
    description:
      "Đạt chuẩn kiểm định quốc tế, được chứng nhận bởi các tổ chức da liễu uy tín. Chúng tôi không bao giờ thỏa hiệp với chất lượng — đó là cam kết của chúng tôi với bạn.",
  },
  {
    icon: Shield,
    title: "Tin Cậy",
    description:
      "Hơn 50.000 khách hàng đã tin dùng sản phẩm Cổ Ngân Beauty. Chính sách hoàn tiền 30 ngày nếu không hài lòng. Chúng tôi đặt sự hài lòng của bạn lên hàng đầu.",
  },
];

const stats = [
  { icon: Users, value: "50,000+", label: "Khách Hàng Tin Dùng" },
  { icon: Star, value: "4.9/5", label: "Đánh Giá Trung Bình" },
  { icon: Award, value: "12+", label: "Giải Thưởng Uy Tín" },
  { icon: Heart, value: "100%", label: "Nguyên Liệu Tự Nhiên" },
];

export default function AboutPage() {
  return (
    <main>
      {/* Page Header */}
      <section className="bg-secondary/40 border-b border-border py-14">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-body text-xs font-medium tracking-[0.2em] uppercase text-rose">
              Chúng Tôi Là Ai
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-3">
              Giới Thiệu
            </h1>
            <div className="section-divider" />
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <img
                src="/assets/generated/about-influencer.dim_500x600.jpg"
                alt="Cổ Ngân - Nhà sáng lập"
                className="rounded-2xl w-full object-cover shadow-beauty-lg"
                loading="lazy"
              />
              {/* Decorative card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-5 shadow-beauty max-w-xs"
              >
                <p className="font-serif text-sm italic text-foreground leading-relaxed">
                  "Vẻ đẹp thực sự không cần phải hoàn hảo — chỉ cần tự nhiên và
                  tự tin."
                </p>
                <p className="font-body text-xs font-semibold text-rose mt-2">
                  — Cổ Ngân
                </p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-6"
          >
            <div>
              <span className="font-body text-xs font-medium tracking-[0.2em] uppercase text-rose">
                Câu Chuyện Của Chúng Tôi
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
                Đam Mê Tạo Nên
                <br />
                <span className="italic font-serif">Thương Hiệu</span>
              </h2>
            </div>
            <div className="section-divider" style={{ margin: "0" }} />
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Cổ Ngân Beauty ra đời từ niềm đam mê với vẻ đẹp tự nhiên và mong
              muốn giúp mỗi người phụ nữ Việt Nam tự tin tỏa sáng với vẻ đẹp
              riêng của mình.
            </p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Được thành lập năm 2020 tại TP. Hồ Chí Minh, Cổ Ngân Beauty đã
              nhanh chóng trở thành thương hiệu làm đẹp được yêu thích nhất
              trong cộng đồng phụ nữ Việt Nam với triết lý "vẻ đẹp từ thiên
              nhiên."
            </p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Mỗi sản phẩm đều được nghiên cứu và phát triển bởi đội ngũ chuyên
              gia da liễu hàng đầu, kết hợp với nguyên liệu thiên nhiên quý hiếm
              từ các vùng miền Việt Nam.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-foreground py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary-foreground/10 mb-3 mx-auto">
                  <stat.icon className="h-6 w-6 text-primary-foreground/70" />
                </div>
                <div className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">
                  {stat.value}
                </div>
                <div className="font-body text-xs text-primary-foreground/60 mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 container mx-auto px-4 max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="font-body text-xs font-medium tracking-[0.2em] uppercase text-rose">
              Triết Lý Thương Hiệu
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-3">
              Giá Trị Cốt Lõi
            </h2>
            <div className="section-divider" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeUp}
                className="text-center p-8 rounded-2xl border border-border bg-card hover:shadow-beauty transition-shadow"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/8 mb-5"
                >
                  <value.icon className="h-8 w-8 text-rose" />
                </motion.div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="bg-secondary/30 py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="text-center mb-12">
              <span className="font-body text-xs font-medium tracking-[0.2em] uppercase text-rose">
                Con Người
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-3">
                Đội Ngũ Của Chúng Tôi
              </h2>
              <div className="section-divider" />
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  name: "Cổ Ngân",
                  role: "Nhà Sáng Lập & Beauty Expert",
                  description:
                    "10 năm kinh nghiệm trong ngành làm đẹp, chuyên gia da liễu được đào tạo tại Hàn Quốc.",
                  img: "/assets/generated/about-influencer.dim_500x600.jpg",
                },
                {
                  name: "Dr. Minh Nguyệt",
                  role: "Chuyên Gia Da Liễu",
                  description:
                    "Bác sĩ da liễu với 15 năm kinh nghiệm, chuyên về điều trị và chăm sóc da chuyên sâu.",
                  img: "/assets/generated/blog-skincare-routine.dim_600x400.jpg",
                },
                {
                  name: "Thảo Linh",
                  role: "Senior Beauty Blogger",
                  description:
                    "Blogger làm đẹp với hơn 1 triệu followers, chuyên review sản phẩm và chia sẻ bí quyết làm đẹp.",
                  img: "/assets/generated/blog-natural.dim_600x400.jpg",
                },
              ].map((member) => (
                <motion.div
                  key={member.name}
                  variants={fadeUp}
                  className="text-center group"
                >
                  <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-4 border-border group-hover:border-primary transition-colors shadow-beauty">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground">
                    {member.name}
                  </h3>
                  <p className="font-body text-xs text-rose font-medium mt-0.5 mb-2">
                    {member.role}
                  </p>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    {member.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
