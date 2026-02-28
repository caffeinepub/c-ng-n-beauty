import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShoppingBag, Star } from "lucide-react";
import type { Product } from "../backend.d";
import { useCart } from "../context/CartContext";
import { categoryLabel, formatVND } from "../lib/format";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const badgeClass =
    product.category === "skincare"
      ? "badge-skincare"
      : product.category === "makeup"
        ? "badge-makeup"
        : "badge-haircare";

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
  };

  return (
    <article className="product-card bg-card rounded-xl overflow-hidden border border-border group">
      <div className="relative overflow-hidden aspect-square bg-secondary/30">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <Badge className={`text-xs font-body font-medium ${badgeClass}`}>
            {categoryLabel(product.category)}
          </Badge>
        </div>
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
            <span className="font-body text-sm font-medium text-foreground/70 bg-background px-4 py-2 rounded-full border">
              Hết hàng
            </span>
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-body font-semibold text-sm leading-tight line-clamp-2 text-foreground">
            {product.name}
          </h3>
          <p className="font-body text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Rating - decorative */}
        <div className="flex items-center gap-1">
          {["s1", "s2", "s3", "s4", "s5"].map((k) => (
            <Star key={k} className="h-3 w-3 fill-amber-400 text-amber-400" />
          ))}
          <span className="text-xs font-body text-muted-foreground ml-1">
            (48)
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="font-display text-base font-bold text-rose">
            {formatVND(product.price)}
          </span>
          <Button
            size="sm"
            onClick={handleAdd}
            disabled={!product.inStock}
            className="btn-shine bg-primary text-primary-foreground hover:bg-primary/90 h-8 px-3 text-xs gap-1.5"
          >
            {product.inStock ? (
              <>
                <ShoppingBag className="h-3.5 w-3.5" />
                Thêm Vào Giỏ
              </>
            ) : (
              <>
                <CheckCircle className="h-3.5 w-3.5" />
                Hết Hàng
              </>
            )}
          </Button>
        </div>
      </div>
    </article>
  );
}
