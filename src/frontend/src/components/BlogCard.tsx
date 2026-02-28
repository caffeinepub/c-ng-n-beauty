import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar } from "lucide-react";
import type { BlogPost } from "../backend.d";
import { formatDate } from "../lib/format";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="blog-card bg-card rounded-xl overflow-hidden border border-border group">
      <Link
        to="/blog/$id"
        params={{ id: post.id }}
        className="block"
        aria-label={post.title}
      >
        <div className="overflow-hidden aspect-[3/2] bg-secondary/30">
          <img
            src={
              post.imageUrl ||
              "/assets/generated/blog-skincare-routine.dim_600x400.jpg"
            }
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="p-5 space-y-3">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 2).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs font-body py-0.5 px-2"
            >
              #{tag}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <Link to="/blog/$id" params={{ id: post.id }}>
          <h3 className="font-display font-semibold text-base leading-snug line-clamp-2 text-foreground group-hover:text-rose transition-colors">
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="font-body text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5 text-xs font-body text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formatDate(post.publishDate)}</span>
          </div>
          <Link
            to="/blog/$id"
            params={{ id: post.id }}
            className="flex items-center gap-1 text-xs font-body font-medium text-rose hover:gap-2 transition-all"
            aria-label={`Đọc thêm: ${post.title}`}
          >
            Đọc thêm
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
