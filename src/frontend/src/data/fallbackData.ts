import type { BlogPost, Product } from "../backend.d";

export const fallbackProducts: Product[] = [
  {
    id: "p1",
    name: "Serum Dưỡng Trắng Da Vitamin C",
    description:
      "Serum chứa Vitamin C đậm đặc giúp làm sáng da, mờ thâm nám và bảo vệ da khỏi tác động môi trường. Thấm nhanh, không nhờn rít.",
    price: 450000,
    category: "skincare",
    imageUrl: "/assets/generated/product-serum.dim_400x400.jpg",
    inStock: true,
  },
  {
    id: "p2",
    name: "Kem Dưỡng Ẩm Ban Đêm Chiết Xuất Hoa Hồng",
    description:
      "Kem dưỡng ẩm chuyên sâu ban đêm, chiết xuất từ tinh dầu hoa hồng và hyaluronic acid. Phục hồi da mệt mỏi, căng mịn sau một đêm ngủ.",
    price: 380000,
    category: "skincare",
    imageUrl: "/assets/generated/product-cream.dim_400x400.jpg",
    inStock: true,
  },
  {
    id: "p3",
    name: "Son Môi Lì Nhung Cổ Ngân Rouge Velvet",
    description:
      "Son môi lì nhung cao cấp với 12 tông màu tinh tế. Màu bền lâu tới 8 tiếng, không khô môi, dưỡng ẩm với Vitamin E.",
    price: 295000,
    category: "makeup",
    imageUrl: "/assets/generated/product-lipstick.dim_400x400.jpg",
    inStock: true,
  },
  {
    id: "p4",
    name: "Dầu Dưỡng Tóc Óng Mượt Tinh Chất Ngăn Ngừa Rụng",
    description:
      "Dầu dưỡng tóc cao cấp với công thức đặc biệt từ tinh dầu argan và keratin tự nhiên. Phục hồi tóc hư tổn, giảm gãy rụng tới 90%.",
    price: 320000,
    category: "haircare",
    imageUrl: "/assets/generated/product-hair.dim_400x400.jpg",
    inStock: true,
  },
  {
    id: "p5",
    name: "Tẩy Trang Micellar Nước Hoa Cúc La Mã",
    description:
      "Nước tẩy trang dịu nhẹ với tinh chất hoa cúc La Mã, làm sạch sâu lớp trang điểm và bụi bẩn mà không làm khô da. Phù hợp cho da nhạy cảm.",
    price: 185000,
    category: "skincare",
    imageUrl: "/assets/generated/product-serum.dim_400x400.jpg",
    inStock: true,
  },
  {
    id: "p6",
    name: "Phấn Phủ Kiềm Dầu Siêu Mịn Oil-Control",
    description:
      "Phấn phủ kiềm dầu cao cấp, kiểm soát bóng nhờn lên tới 12 tiếng. Cho lớp nền mịn như nhung, che phủ khuyết điểm tự nhiên.",
    price: 275000,
    category: "makeup",
    imageUrl: "/assets/generated/product-lipstick.dim_400x400.jpg",
    inStock: false,
  },
];

export const fallbackBlogPosts: BlogPost[] = [
  {
    id: "b1",
    title: "5 Bước Chăm Sóc Da Buổi Sáng Cho Da Khỏe Mạnh",
    excerpt:
      "Một quy trình chăm sóc da buổi sáng đúng cách sẽ giúp da bạn luôn tươi sáng, căng mịn suốt cả ngày. Cổ Ngân chia sẻ bí quyết 5 bước đơn giản nhưng hiệu quả.",
    content: `Chăm sóc da buổi sáng đúng cách là nền tảng để có làn da khỏe đẹp. Dưới đây là quy trình 5 bước mà Cổ Ngân áp dụng mỗi ngày:

**Bước 1: Rửa mặt nhẹ nhàng**
Dùng sữa rửa mặt dịu nhẹ, không chứa SLS để làm sạch da mà không phá vỡ hàng rào bảo vệ tự nhiên.

**Bước 2: Toner cân bằng độ pH**
Toner giúp cân bằng độ pH sau khi rửa mặt và chuẩn bị da hấp thụ dưỡng chất tốt hơn.

**Bước 3: Serum Vitamin C**
Vitamin C là "siêu anh hùng" cho da ban sáng - chống oxy hóa, làm sáng và bảo vệ da khỏi tia UV.

**Bước 4: Kem dưỡng ẩm**
Khóa ẩm và dưỡng dịu cho da cả ngày. Chọn loại phù hợp với loại da của bạn.

**Bước 5: Kem chống nắng SPF 50+**
Bước quan trọng nhất không thể bỏ qua! Chống nắng bảo vệ da khỏi lão hóa sớm và ung thư da.`,
    author: "Cổ Ngân",
    publishDate: BigInt(Date.now() - 7 * 24 * 60 * 60 * 1000),
    tags: ["skincare", "chăm sóc da", "buổi sáng", "routine"],
    imageUrl: "/assets/generated/blog-skincare-routine.dim_600x400.jpg",
  },
  {
    id: "b2",
    title: "Bí Quyết Da Căng Mịn Của Cổ Ngân - Bí Mật Cuối Cùng Được Tiết Lộ",
    excerpt:
      "Nhiều người hỏi mình làm thế nào để có làn da căng mịn như vậy. Hôm nay mình sẽ chia sẻ tất cả những bí quyết đã giúp mình duy trì làn da này suốt 5 năm qua.",
    content: `Sau nhiều năm thử nghiệm và nghiên cứu, mình đã tìm ra những bí quyết vàng để duy trì làn da căng mịn:

**1. Uống đủ nước mỗi ngày**
Đây là nền tảng của mọi làn da đẹp. Mình uống ít nhất 2.5 lít nước mỗi ngày, thêm nước detox với chanh và dưa chuột.

**2. Ngủ đủ 7-8 tiếng**
Đêm là thời gian da tự phục hồi. Thiếu ngủ là kẻ thù số 1 của làn da.

**3. Ăn nhiều rau xanh và trái cây**
Chế độ ăn giàu antioxidant giúp chống lại gốc tự do gây lão hóa da.

**4. Massage mặt mỗi tối**
Massage mặt giúp tăng cường lưu thông máu và lymph, giảm phù nề và tăng độ đàn hồi cho da.

**5. Không bao giờ đi ngủ khi còn son phấn**
Đây là quy tắc bất di bất dịch của mình. Luôn tẩy trang kỹ trước khi ngủ.`,
    author: "Cổ Ngân",
    publishDate: BigInt(Date.now() - 14 * 24 * 60 * 60 * 1000),
    tags: ["bí quyết", "da căng mịn", "tips", "chăm sóc da"],
    imageUrl: "/assets/generated/blog-natural.dim_600x400.jpg",
  },
  {
    id: "b3",
    title: "Review Chi Tiết: Serum Dưỡng Trắng Vitamin C Cổ Ngân",
    excerpt:
      "Sau 30 ngày sử dụng Serum Dưỡng Trắng Vitamin C của Cổ Ngân Beauty, mình sẽ chia sẻ đánh giá thành thật nhất. Liệu có thực sự hiệu quả như quảng cáo?",
    content: `Đây là review thật 100% sau 30 ngày dùng Serum Dưỡng Trắng Vitamin C Cổ Ngân:

**Tuần 1-2:**
Da bắt đầu sáng hơn đáng kể. Những nốt thâm do mụn nhạt dần. Texture da mịn màng hơn.

**Tuần 3:**
Tông da đều màu, giảm bóng nhờn rõ rệt. Mình nhận được rất nhiều lời khen về da.

**Tuần 4:**
Da sáng và khỏe hơn 30% so với trước. Các nốt thâm nhạt tới 60%. Rất hài lòng!

**Ưu điểm:**
- Thấm nhanh, không nhờn
- Mùi thơm nhẹ nhàng dễ chịu
- Packaging sang trọng, dễ dùng
- Giá cả hợp lý

**Nhược điểm:**
- Cần kiên trì ít nhất 4-6 tuần mới thấy rõ hiệu quả
- Nên dùng kem chống nắng kèm theo

**Kết luận:** 9/10 điểm. Rất đáng để thử!`,
    author: "Cổ Ngân",
    publishDate: BigInt(Date.now() - 3 * 24 * 60 * 60 * 1000),
    tags: ["review", "serum", "vitamin C", "dưỡng trắng"],
    imageUrl: "/assets/generated/blog-makeup.dim_600x400.jpg",
  },
];
