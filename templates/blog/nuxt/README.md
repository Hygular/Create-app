# Hygular Blog Starter (Nuxt 3)

A clean, responsive **Nuxt 3 & Vue 3 blog starter** built with Hygular (`@hygular/core`). This starter is lightweight, modern, and SEO-ready: it includes all essentials needed to launch a modern publishing platform while maintaining full compatibility with the Hygular UI system.

## Features

- **Nuxt 3 & Vue 3 (Composition API)** setup
- **Hygular UI System** integrated directly via `@hygular/core`
- **Responsive Homepage** with featured hero article and latest posts
- **Articles Catalog** (`/blog`) with category filter navigation
- **Single Article Pages** (`/blog/[slug]`) with related posts and dynamic metadata
- **Categories Archive** (`/categories` and `/categories/[slug]`)
- **Static & Informational Pages**: About, Contact, Privacy Policy, Terms of Service
- **Error & 404 Handling** (`error.vue`)
- **Mock Data Layer** in `lib/data.ts`
- **SEO & OpenGraph Meta** tags powered by `useSeoMeta()`

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Build for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Or generate a static site (SSG):

```bash
npm run generate
```

## Hygular Integration

Hygular is integrated via `composables/useHygular.ts` using `@hygular/core`:
- Styling is imported via `@hygular/core/css` in `nuxt.config.ts`.
- Runtime is instantiated with `import { Hygular } from '@hygular/core'` and initialized with `hygular.config.js`.
- Mobile navbar toggler uses `data-hygular-toggle="navbar"` and `data-target="#blog-mobile-menu"`.
