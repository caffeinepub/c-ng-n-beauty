import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import BlogCard from "../components/BlogCard";
import { fallbackBlogPosts } from "../data/fallbackData";
import { useAllBlogPosts } from "../hooks/useQueries";

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

export default function BlogPage() {
  const { data: posts, isLoading } = useAllBlogPosts();
  const displayPosts = posts && posts.length > 0 ? posts : fallbackBlogPosts;

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
              Chia Sẻ Kiến Thức
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-3">
              Blog Làm Đẹp
            </h1>
            <div className="section-divider" />
            <p className="font-body text-sm text-muted-foreground mt-4 max-w-md mx-auto leading-relaxed">
              Bí quyết làm đẹp, review sản phẩm và kiến thức chăm sóc da từ
              chuyên gia Cổ Ngân
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 container mx-auto px-4 max-w-6xl">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-rose" />
            <p className="font-body text-sm text-muted-foreground">
              Đang tải bài viết...
            </p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displayPosts.map((post) => (
              <motion.div key={post.id} variants={fadeUp}>
                <BlogCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </main>
  );
}
