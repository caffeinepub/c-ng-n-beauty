import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Loader2, Tag, User } from "lucide-react";
import { motion } from "motion/react";
import { fallbackBlogPosts } from "../data/fallbackData";
import { useBlogPostById } from "../hooks/useQueries";
import { formatDate } from "../lib/format";

export default function BlogDetailPage() {
  const params = useParams({ strict: false });
  const id = (params as Record<string, string>).id ?? "";
  const { data: post, isLoading } = useBlogPostById(id ?? "");

  const displayPost =
    post ?? fallbackBlogPosts.find((p) => p.id === id) ?? fallbackBlogPosts[0];

  if (isLoading) {
    return (
      <main className="py-24 flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-rose" />
        <p className="font-body text-sm text-muted-foreground">
          Đang tải bài viết...
        </p>
      </main>
    );
  }

  return (
    <main className="py-10 pb-20">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="font-body text-muted-foreground hover:text-foreground -ml-2"
          >
            <Link to="/blog">
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              Quay Lại Blog
            </Link>
          </Button>
        </motion.div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden aspect-[16/9] mb-8 shadow-beauty"
        >
          <img
            src={
              displayPost.imageUrl ||
              "/assets/generated/blog-skincare-routine.dim_600x400.jpg"
            }
            alt={displayPost.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {displayPost.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="font-body text-xs"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
            {displayPost.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-5 py-4 border-y border-border">
            <div className="flex items-center gap-2 text-sm font-body text-muted-foreground">
              <User className="h-4 w-4" />
              <span className="font-medium text-foreground">
                {displayPost.author}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm font-body text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(displayPost.publishDate)}</span>
            </div>
          </div>

          {/* Excerpt */}
          <p className="font-body text-base text-muted-foreground leading-relaxed italic border-l-2 border-rose pl-4">
            {displayPost.excerpt}
          </p>

          {/* Body content */}
          <div className="font-body text-sm text-foreground leading-relaxed space-y-4 prose prose-sm max-w-none">
            {displayPost.content.split("\n\n").map((para) => (
              <p key={para.slice(0, 40)} className="leading-7">
                {para.split("**").map((segment, segIdx) =>
                  segIdx % 2 === 1 ? (
                    <strong
                      // biome-ignore lint/suspicious/noArrayIndexKey: segments from split don't have stable ids
                      key={segIdx}
                      className="font-semibold text-foreground"
                    >
                      {segment}
                    </strong>
                  ) : (
                    segment
                  ),
                )}
              </p>
            ))}
          </div>

          {/* Back CTA */}
          <div className="pt-8 border-t border-border">
            <Button asChild variant="outline" className="font-body">
              <Link to="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Xem Thêm Bài Viết
              </Link>
            </Button>
          </div>
        </motion.article>
      </div>
    </main>
  );
}
