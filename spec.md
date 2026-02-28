# Cổ Ngân Beauty

## Current State
Empty project. Only shadcn/ui base components installed. No backend, no App.tsx, no pages.

## Requested Changes (Diff)

### Add
- Full Vietnamese beauty influencer website for "Cổ Ngân Beauty" brand
- Homepage with hero section, featured products, about section, featured blog posts
- Shop page with product catalog (skincare, makeup, etc.) with cart functionality
- Blog page with beauty tips, tutorials, skincare routines in Vietnamese
- About page with brand story and influencer profile
- Contact page with contact form
- Backend: product catalog, blog posts, contact message storage
- Navigation with responsive mobile menu
- Footer with social links and brand info

### Modify
- Nothing (new project)

### Remove
- Nothing

## Implementation Plan
1. Backend: Product type (id, name, desc, price, category, image), BlogPost type (id, title, content, date, tags), ContactMessage type. CRUD for products, blog posts. Store contact messages.
2. Frontend: Multi-page app with React Router. Pages: Home, Shop, Blog, About, Contact. Shared Header/Footer. Vietnamese content throughout.
