# 🚀 Next.js Project

## 📌 Giới thiệu
Dự án này được xây dựng bằng [Next.js](https://nextjs.org/) với cấu trúc thư mục rõ ràng, dễ mở rộng và tuân theo quy tắc đặt tên file/folder chuẩn.

---

## 📂 Cấu trúc thư mục

project/
├─ app/ # App Router (Next.js 13+)
│ ├─ page.tsx # Trang chính "/"
│ ├─ layout.tsx # Layout chính
│ ├─ user-profile/ # Route "/user-profile"
│ │ └─ page.tsx
│ └─ blog/
│ └─ [slug]/page.tsx # Route động "/blog/:slug"
│
├─ components/ # Reusable UI components
│ ├─ NavBar.tsx
│ └─ UserCard.tsx
│
├─ hooks/ # Custom hooks
│ └─ useAuth.ts
│
├─ lib/ # Hàm tiện ích (helper functions)
│ └─ date-helper.ts
│
├─ styles/ # CSS / Tailwind / SCSS
│ └─ globals.css
│
├─ public/ # Static assets (ảnh, icon)
│
├─ package.json
└─ README.md

yaml
Sao chép mã

---

## 📝 Quy tắc đặt tên
| Loại                  | Quy tắc đặt tên           | Ví dụ (2 từ)            |
|------------------------|--------------------------|--------------------------|
| **File & Folder route** (`app/`) | lowercase, dùng `-` nếu nhiều từ | `user-profile/page.tsx` |
| **Component** (`components/`) | PascalCase | `UserProfile.tsx` |
| **Hook** (`hooks/`)   | camelCase, bắt đầu bằng `use` | `useProfile.ts` |
| **Helper/Lib** (`lib/`) | camelCase hoặc kebab-case | `date-helper.ts` |
| **Dynamic route** | Dùng `[param]` hoặc `[[param]]` | `blog/[slug]/page.tsx` |

---

## 🚀 Cách chạy dự án

### 1. Cài đặt dependencies
```bash
npm install
# hoặc
yarn install