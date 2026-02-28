import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BlogPost {
    id: string;
    title: string;
    content: string;
    publishDate: bigint;
    tags: Array<string>;
    author: string;
    imageUrl: string;
    excerpt: string;
}
export interface ContactMessage {
    id: string;
    name: string;
    createdAt: bigint;
    email: string;
    message: string;
    phone: string;
}
export interface Product {
    id: string;
    inStock: boolean;
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    price: number;
}
export interface backendInterface {
    addBlogPost(post: BlogPost): Promise<void>;
    addProduct(product: Product): Promise<void>;
    deleteBlogPost(id: string): Promise<void>;
    deleteProduct(id: string): Promise<void>;
    getAllBlogPosts(): Promise<Array<BlogPost>>;
    getAllProducts(): Promise<Array<Product>>;
    getBlogPostById(id: string): Promise<BlogPost>;
    getContactMessages(): Promise<Array<ContactMessage>>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    submitContactMessage(message: ContactMessage): Promise<void>;
    updateProduct(product: Product): Promise<void>;
}
