import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, SearchX } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Product } from "../backend.d";
import ProductCard from "../components/ProductCard";
import { fallbackProducts } from "../data/fallbackData";
import { useAllProducts } from "../hooks/useQueries";

interface ShopPageProps {
  onAddToCart: (product: Product) => void;
}

const categories = [
  { key: "all", label: "Tất Cả" },
  { key: "skincare", label: "Dưỡng Da" },
  { key: "makeup", label: "Trang Điểm" },
  { key: "haircare", label: "Chăm Sóc Tóc" },
];

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function ShopPage({ onAddToCart }: ShopPageProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const { data: products, isLoading } = useAllProducts();

  const allProducts =
    products && products.length > 0 ? products : fallbackProducts;

  const filteredProducts =
    activeCategory === "all"
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory);

  return (
    <main>
      {/* Page header */}
      <section className="bg-secondary/40 border-b border-border py-14">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-body text-xs font-medium tracking-[0.2em] uppercase text-rose">
              Mua Sắm
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-3">
              Cửa Hàng
            </h1>
            <div className="section-divider" />
            <p className="font-body text-sm text-muted-foreground mt-4 max-w-lg mx-auto leading-relaxed">
              Khám phá bộ sưu tập sản phẩm làm đẹp từ thiên nhiên được hàng
              nghìn khách hàng Việt Nam tin dùng
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 container mx-auto px-4 max-w-6xl">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10 flex justify-center"
        >
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="font-body h-11 gap-1 bg-secondary/60">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.key}
                  value={cat.key}
                  className="text-sm font-medium px-5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-rose" />
            <p className="font-body text-sm text-muted-foreground">
              Đang tải sản phẩm...
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 gap-4"
          >
            <SearchX className="h-12 w-12 text-muted-foreground/40" />
            <p className="font-display text-lg font-semibold text-foreground">
              Không có sản phẩm
            </p>
            <p className="font-body text-sm text-muted-foreground">
              Chưa có sản phẩm nào trong danh mục này
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={activeCategory}
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product) => (
              <motion.div key={product.id} variants={fadeUp}>
                <ProductCard product={product} onAddToCart={onAddToCart} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Product count */}
        {!isLoading && filteredProducts.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center font-body text-xs text-muted-foreground mt-10"
          >
            Hiển thị {filteredProducts.length} sản phẩm
          </motion.p>
        )}
      </section>
    </main>
  );
}
