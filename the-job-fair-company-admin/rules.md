# 🧩 Next.js Feature-Based Folder Structure Guide (App Router + src)

## 1. Folder Structure Template

```bash
Example:
my-nextjs-app/
│
├─ src/
│   ├─ app/                      # App Router folder
│   │   ├─ layout.jsx             # Root layout (wraps all pages)
│   │   ├─ page.jsx               # Homepage
│   │   └─ about/
│   │       └─ page.jsx           # About page
│   │
│   ├─ features/                  # Feature-specific folders
│   │   ├─ navbar/
│   │   │   ├─ Navbar.jsx
│   │   │   ├─ components/
│   │   │   │   ├─ logo.jsx
│   │   │   │   └─ navbar.jsx
│   │   │   └─ assets/            # Feature-specific images
│   │   │       └─ logo.png
│   │   │
│   │   └─ footer/
│   │       ├─ Footer.jsx
│   │       └─ assets/
│   │           └─ footer-bg.png
│   │
│   ├─ styles/                    # Optional global styles
│   │   └─ globals.css
│   │
│   └─ components/                # Shared components (used across multiple features)
│
├─ public/                        # Global static assets
│   └─ images/
│       ├─ global-logo.png
│       └─ banners/
│           └─ hero-banner.jpg
│
├─ package.json
└─ tailwind.config.js

Follow this folder structure for the project(features based folder structure) always 