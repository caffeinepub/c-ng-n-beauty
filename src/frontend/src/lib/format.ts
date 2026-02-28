export function formatVND(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(price);
}

export function formatDate(timestamp: bigint | number): string {
  const ms = typeof timestamp === "bigint" ? Number(timestamp) : timestamp;
  return new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(ms));
}

export function categoryLabel(category: string): string {
  const map: Record<string, string> = {
    skincare: "Dưỡng Da",
    makeup: "Trang Điểm",
    haircare: "Chăm Sóc Tóc",
    all: "Tất Cả",
  };
  return map[category] ?? category;
}
