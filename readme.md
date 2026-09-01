<div align="center">
  <br />
    <a href="https://prostore-ajfm88.vercel.app">
      <img src="./public/images/screen.png" alt="Prostore — Next.js Ecommerce">
    </a>
  <br />

  <div>
    <a href="https://nextjs.org">
      <img src="https://img.shields.io/badge/-Next.js-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="next.js" />
    </a>
    <a href="https://react.dev">
      <img src="https://img.shields.io/badge/-React-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="react" />
    </a>
    <a href="https://www.typescriptlang.org">
      <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    </a>
    <a href="https://www.postgresql.org">
      <img src="https://img.shields.io/badge/-PostgreSQL-black?style=for-the-badge&logoColor=white&logo=postgresql&color=4169E1" alt="postgresql" />
    </a>
    <a href="https://www.prisma.io">
      <img src="https://img.shields.io/badge/-Prisma-black?style=for-the-badge&logoColor=white&logo=prisma&color=2D3748" alt="prisma" />
    </a>
    <a href="https://authjs.dev">
      <img src="https://img.shields.io/badge/-Auth.js-black?style=for-the-badge&logoColor=white&color=8B5CF6" alt="auth.js" />
    </a>
    <a href="https://tailwindcss.com">
      <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    </a>
    <a href="https://ui.shadcn.com">
      <img src="https://img.shields.io/badge/-shadcn%2Fui-black?style=for-the-badge&logoColor=white&logo=shadcnui&color=000000" alt="shadcn/ui" />
    </a>
    <a href="https://zod.dev">
      <img src="https://img.shields.io/badge/-Zod-black?style=for-the-badge&logoColor=white&logo=zod&color=3E67B1" alt="zod" />
    </a>
    <a href="https://stripe.com">
      <img src="https://img.shields.io/badge/-Stripe-black?style=for-the-badge&logoColor=white&logo=stripe&color=635BFF" alt="stripe" />
    </a>
    <a href="https://developer.paypal.com">
      <img src="https://img.shields.io/badge/-PayPal-black?style=for-the-badge&logoColor=white&logo=paypal&color=00457C" alt="paypal" />
    </a>
    <a href="https://openai.com">
      <img src="https://img.shields.io/badge/-OpenAI-black?style=for-the-badge&logoColor=white&logo=openai&color=412991" alt="openai" />
    </a>
    <a href="https://vercel.com">
      <img src="https://img.shields.io/badge/-Vercel-black?style=for-the-badge&logoColor=white&logo=vercel&color=000000" alt="vercel" />
    </a>
  </div>

  <h3 align="center">Full-Stack Next.js Ecommerce Platform</h3>
</div>

## 📋 <a name="table">Table of Contents</a>

1.  🤖 [Introduction](#introduction)
2.  🚀 [Live Demo](#live-demo)
3.  ⚙️ [Tech Stack](#tech-stack)
4.  🔋 [Features](#features)
5.  🏗️ [Architecture](#architecture)
6.  🗂️ [Project Structure](#project-structure)
7.  🧭 [Pages and Routes](#pages-and-routes)
8.  🧩 [Server Actions and API Routes](#server-actions)
9.  🗃️ [Data Model](#data-model)
10. 🤸 [Quick Start](#quick-start)
11. 🧪 [Testing](#testing)
12. 🔐 [Demo Accounts](#demo-accounts)
13. 🎬 [Tutorial](#tutorial)
14. 🧬 [Related Builds](#related-builds)

## 🤖 <a name="introduction">Introduction</a>

Prostore is a full-featured ecommerce store built on the **Next.js App Router**, with **server actions as its entire data layer** — there is no separate API server to run or maintain. It covers the whole shopping journey (browse → cart → multi-step checkout → payment → emailed receipt) alongside a role-gated **admin dashboard**, and settles orders three ways: **PayPal**, **Stripe** (confirmed by webhook), and **Cash on Delivery**.

Everything is type-safe end to end: **Zod** schemas define the shape of every form and mutation, those same schemas produce the **TypeScript** domain types, and **Prisma** talks to **PostgreSQL** behind them.

## 🚀 <a name="live-demo">Live Demo</a>

<a href="https://prostore-ajfm88.vercel.app"><img src="https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel"/></a>

## ⚙️ <a name="tech-stack">Tech Stack</a>

**Framework and language:**

- ▲ [Next.js 15](https://nextjs.org) — App Router, React Server Components, Server Actions
- ⚛️ [React 19](https://react.dev)
- 🔷 [TypeScript](https://www.typescriptlang.org)

**Data and auth:**

- 🐘 [PostgreSQL](https://www.postgresql.org)
- 🔺 [Prisma](https://www.prisma.io) — ORM, migrations, and `pg` driver adapter
- 🔐 [Auth.js (NextAuth v5)](https://authjs.dev) — credentials provider, JWT sessions, role-based access
- 🧮 [Zod](https://zod.dev) — validation and the single source of truth for domain types

**UI and forms:**

- 🌬️ [Tailwind CSS](https://tailwindcss.com)
- 🧩 [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://www.radix-ui.com) primitives
- 📝 [React Hook Form](https://react-hook-form.com) — with the Zod resolver
- 🎠 [Embla Carousel](https://www.embla-carousel.com) — featured-product banners
- 📊 [Recharts](https://recharts.org) — admin sales chart
- 🌗 [next-themes](https://github.com/pacocoursey/next-themes) — dark / light mode
- 🎨 [Lucide React](https://lucide.dev) — icons

**Payments, media and email:**

- 💳 [Stripe](https://stripe.com) — card payments + webhook confirmation
- 🅿️ [PayPal](https://developer.paypal.com) — REST checkout
- 🖼️ [Uploadthing](https://uploadthing.com) — product image uploads
- ✉️ [Resend](https://resend.com) + [React Email](https://react.email) — order receipt emails
- 🤖 [OpenAI](https://openai.com) — AI-generated product names and descriptions (GPT-4o mini)

**Tooling:**

- 🧪 [Jest](https://jestjs.io) + [ts-jest](https://kulshekhar.github.io/ts-jest)
- 🔍 [ESLint](https://eslint.org)
- ☁️ [Vercel](https://vercel.com) — hosting

## 🔋 <a name="features">Features</a>

🛍️ **Storefront:** Featured-product carousel with banners, newest arrivals, a live deal countdown, and category icon boxes on the homepage.

🔎 **Search, Filter and Sort:** Full-text product search with filters for category, price range and minimum rating, sortable by newest, price, or rating — all driven through shareable URL query params, with pagination.

🖼️ **Product Detail:** Image gallery, stock-aware add-to-cart, and per-product ratings and reviews.

⭐ **Ratings and Reviews:** Shoppers leave a star rating and written review (one per product, editable), but only for products they've actually bought — the action verifies a paid order containing that product before saving, so every review is a genuine verified purchase. Averages and counts roll up onto the product.

🛒 **Guest and User Carts:** Anonymous carts are keyed to a `sessionCartId` cookie and automatically merged onto the user's account on sign-in, so nothing is lost at login.

❤️ **Wishlist:** Signed-in shoppers save products with a heart on any product card or detail page and revisit them at `/user/wishlist`; the toggle is optimistic and backed by a `Wishlist` join table.

🧾 **Multi-Step Checkout:** Guided flow through shipping address → payment method → order review, with a progress indicator at each step.

🏷️ **Promo Codes:** Shoppers apply a discount code on the cart; it's validated for its active window, remaining redemptions and minimum order value, and re-checked on every cart change so a stale code drops off on its own. The redemption `count` is decremented inside the same transaction as order creation, so a limited code can't be oversold under concurrency.

💳 **Three Payment Methods:** PayPal and Stripe (card), plus Cash on Delivery. Stripe payments are confirmed server-side by a `charge.succeeded` webhook rather than trusting the client.

📧 **Order Receipts:** A React Email receipt is sent through Resend once an order is marked paid.

👤 **User Area:** Profile editing, saved shipping address and payment method, and full order history.

🛠️ **Admin Dashboard:** Sales overview with a Recharts chart and headline stats, plus full CRUD for products, orders (mark as delivered/paid), users (edit roles), and promo codes.

🤖 **AI Product Copy:** In the admin product form, one click rewrites the product name or generates a description from the fields you've entered, via OpenAI (GPT-4o mini) — behind the same `requireAdmin()` guard as every other write, with the key kept server-side.

🔒 **Role-Based Access:** Auth.js JWT sessions with an Edge middleware that protects checkout, account, and admin routes; admin-only actions are re-checked server-side via an `auth-guard` helper.

📤 **Direct Image Uploads:** Product and banner images upload straight from the browser to Uploadthing.

🌗 **Dark / Light Mode:** System-aware theme toggle via next-themes.

📱 **Responsive UI:** Built on shadcn/ui and Radix primitives for accessible, mobile-friendly components.

## 🏗️ <a name="architecture">Architecture</a>

Prostore ships as a **single Next.js application** — one codebase, one deployment. There is no standalone backend: **Server Actions** are the data layer, so pages and forms call typed server functions directly instead of round-tripping through a REST API.

| Layer               | Technology                             | Responsibility                                                |
| ------------------- | -------------------------------------- | ------------------------------------------------------------- |
| Rendering           | Next.js App Router (RSC)               | Server-rendered pages, layouts, streaming, route groups       |
| Data layer          | Server Actions + Prisma                | All reads and mutations — no REST API to build or maintain    |
| Database            | PostgreSQL via Prisma `pg` adapter     | Products, users, carts, orders, order items, reviews, wishlists, promo codes |
| Auth                | Auth.js (NextAuth v5)                  | Credentials sign-in, JWT sessions, role in the token          |
| Edge middleware     | `auth.config.ts` + `middleware.ts`     | Protects private routes and issues the `sessionCartId` cookie |
| Validation / types  | Zod → inferred TypeScript              | One schema per shape; types flow from it                      |
| Payments            | PayPal, Stripe (+ webhook), COD        | Checkout and server-side payment confirmation                 |
| Media and email     | Uploadthing, Resend + React Email      | Product images and order-receipt emails                       |
| AI (optional)       | OpenAI (GPT-4o mini)                   | Admin product-copy generation, server-side only               |

A few deliberate choices worth calling out:

- **Server Actions over an API.** Mutations live in `lib/actions/*` and are imported straight into server components and forms, keeping the data layer type-safe from the database to the button that triggers it.
- **Zod as the source of truth.** `lib/validators.ts` defines every input shape; `types/index.ts` infers its TypeScript types from those schemas, so validation and types can never drift apart.
- **Edge-safe password hashing.** `lib/encrypt.ts` uses the Web Crypto API (HMAC-SHA-256) instead of a native dependency, so auth works inside the Edge runtime.
- **Money as strings.** Prisma `Decimal` values are serialized to strings before crossing the server/client boundary, avoiding floating-point drift on prices.

## 🗂️ <a name="project-structure">Project Structure</a>

```
prostore/
├── app/
│   ├── (auth)/                          # Auth route group — centered, minimal layout
│   │   ├── sign-in/                     # Sign-in page + credentials form
│   │   ├── sign-up/                     # Sign-up page + form
│   │   └── layout.tsx
│   ├── (root)/                          # Storefront route group — header + footer layout
│   │   ├── cart/                        # Cart page, cart table, promo-code form
│   │   ├── order/[id]/                  # Order details, PayPal + Stripe payment, success page
│   │   ├── payment-method/              # Choose payment method (protected)
│   │   ├── place-order/                 # Review and place the order (protected)
│   │   ├── product/[slug]/              # Product detail, review form, review list
│   │   ├── search/                      # Search + filter + sort results
│   │   ├── shipping-address/            # Shipping address form (protected)
│   │   ├── layout.tsx
│   │   └── page.tsx                     # Homepage — carousel, latest, deal countdown, icons
│   ├── admin/                           # Admin area (role: admin)
│   │   ├── overview/                    # Dashboard — stats + Recharts sales chart
│   │   ├── products/                    # Product list, create, edit
│   │   ├── orders/                      # All orders, mark delivered
│   │   ├── promos/                      # Promo-code list, create, edit
│   │   ├── users/                       # User list, edit role
│   │   ├── layout.tsx
│   │   └── main-nav.tsx
│   ├── user/                            # Signed-in user area
│   │   ├── orders/                      # Order history
│   │   ├── profile/                     # Edit profile
│   │   ├── wishlist/                    # Saved products grid
│   │   ├── layout.tsx
│   │   └── main-nav.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/          # NextAuth route handler
│   │   ├── uploadthing/                 # Uploadthing file-router endpoints
│   │   └── webhooks/stripe/             # Stripe payment webhook
│   ├── unauthorized/                    # 403 page for blocked routes
│   ├── layout.tsx                       # Root layout — providers, theme, toaster, metadata
│   ├── loading.tsx
│   └── not-found.tsx
├── components/
│   ├── admin/                           # Admin search bar, product form, promo form
│   ├── shared/
│   │   ├── header/                      # Header, menu, search, cart button, mode toggle
│   │   └── product/                     # Product card, list, carousel, images, price, rating, wishlist button
│   ├── ui/                              # shadcn/ui primitives (button, dialog, table, ...)
│   ├── deal-countdown.tsx
│   ├── footer.tsx
│   └── icon-boxes.tsx
├── lib/
│   ├── actions/                         # Server actions — the app's data layer
│   │   ├── cart.actions.ts
│   │   ├── order.actions.ts
│   │   ├── product.actions.ts
│   │   ├── promo.actions.ts
│   │   ├── review.actions.ts
│   │   ├── user.actions.ts
│   │   └── wishlist.actions.ts
│   ├── constants/index.ts               # App config and defaults (env-backed)
│   ├── generated/prisma/                # Generated Prisma client (gitignored)
│   ├── ai.ts                            # Lazy OpenAI client + prompts for admin product copy
│   ├── auth-guard.ts                    # requireAdmin() server-side guard
│   ├── calc-price.ts                    # Pure cart pricing (items, discount, tax, total) — unit-tested
│   ├── encrypt.ts                       # Edge-safe password hashing (Web Crypto HMAC)
│   ├── paypal.ts                        # PayPal REST client
│   ├── uploadthing.ts                   # Uploadthing React helpers
│   ├── utils.ts                         # Formatting, error shaping, plain-object helpers
│   └── validators.ts                    # Zod schemas — source of truth for all shapes
├── db/
│   ├── prisma.ts                        # Prisma client (pg adapter, Decimal → string)
│   ├── sample-data.ts                   # Seed products and users
│   └── seed.ts                          # Seed script
├── prisma/
│   ├── migrations/                      # SQL migration history
│   └── schema.prisma                    # Data model
├── email/
│   ├── index.tsx                        # Resend sender
│   └── purchase-receipt.tsx             # React Email order receipt template
├── hooks/
│   └── use-toast.ts
├── types/
│   ├── index.ts                         # Domain types inferred from Zod schemas
│   └── next-auth.d.ts                   # Session / JWT type augmentation
├── tests/
│   ├── calc-price.test.ts               # Unit tests for cart pricing + discounts
│   ├── utils.test.ts                    # Unit tests for round2 / formatCurrency / formatError
│   ├── paypal.test.ts                   # Integration tests for the PayPal client
│   └── query-string.stub.ts             # Test stub for the ESM-only query-string dep
├── public/images/                       # Banners, logo, screenshot, sample product images
├── assets/styles/globals.css
├── auth.ts                              # NextAuth config — providers, session/JWT callbacks
├── auth.config.ts                       # Edge-safe auth config — route protection + cart cookie
├── middleware.ts                        # Applies auth.config to every request
├── next.config.ts
├── tailwind.config.js
├── components.json                      # shadcn/ui config
├── jest.config.ts
├── prisma.config.ts
├── .env.example
└── package.json
```

## 🧭 <a name="pages-and-routes">Pages and Routes</a>

| Route                   | Page                          | Access    |
| ----------------------- | ----------------------------- | --------- |
| `/`                     | Homepage                      | Public    |
| `/search`               | Search, filter and sort       | Public    |
| `/product/[slug]`       | Product detail + reviews      | Public    |
| `/cart`                 | Shopping cart                 | Public    |
| `/sign-in`, `/sign-up`  | Authentication                | Public    |
| `/shipping-address`     | Checkout — shipping address   | Signed in |
| `/payment-method`       | Checkout — payment method     | Signed in |
| `/place-order`          | Checkout — review and place   | Signed in |
| `/order/[id]`           | Order details and payment     | Signed in |
| `/user/orders`          | Order history                 | Signed in |
| `/user/profile`         | Profile                       | Signed in |
| `/user/wishlist`        | Saved products                | Signed in |
| `/admin/overview`       | Dashboard and sales chart     | Admin     |
| `/admin/products`       | Manage products (CRUD)        | Admin     |
| `/admin/orders`         | Manage orders                 | Admin     |
| `/admin/promos`         | Manage promo codes (CRUD)     | Admin     |
| `/admin/users`          | Manage users and roles        | Admin     |

Access is enforced by the Edge middleware in `auth.config.ts` (unauthenticated visitors to a protected path are redirected to sign-in), and admin-only mutations are re-checked on the server through `requireAdmin()`.

**API routes:**

| Method | Route                       | Purpose                                        |
| ------ | --------------------------- | ---------------------------------------------- |
| `*`    | `/api/auth/[...nextauth]`   | Auth.js sign-in, sign-out, session handling    |
| `*`    | `/api/uploadthing`          | Uploadthing image upload endpoints             |
| `POST` | `/api/webhooks/stripe`      | Stripe `charge.succeeded` payment confirmation |

## 🧩 <a name="server-actions">Server Actions and API Routes</a>

Instead of a REST API, data flows through **server actions** in `lib/actions/`. They are grouped by domain below; actions marked _(admin)_ call `requireAdmin()` first.

### Products — `product.actions.ts`

| Action                | Description                                                          |
| --------------------- | ------------------------------------------------------------------- |
| `getLatestProducts`   | Newest products for the homepage                                    |
| `getFeaturedProducts` | Featured products for the banner carousel                           |
| `getProductBySlug`    | Single product by slug (storefront)                                 |
| `getProductById`      | Single product by id (admin edit)                                   |
| `getAllProducts`      | Search + filter (category, price, rating) + sort + pagination       |
| `getAllCategories`    | Distinct categories with product counts                             |
| `createProduct`       | Create a product _(admin)_                                          |
| `updateProduct`       | Update a product _(admin)_                                          |
| `deleteProduct`       | Delete a product _(admin)_                                          |

### Cart — `cart.actions.ts`

| Action               | Description                                              |
| -------------------- | ------------------------------------------------------- |
| `addItemToCart`      | Add / increment an item; recalculates totals            |
| `removeItemFromCart` | Decrement or remove an item                             |
| `getMyCart`          | Current cart for the session cookie or signed-in user   |
| `applyPromo`         | Validate and apply a discount code to the cart          |
| `removePromo`        | Remove the applied discount code                        |

### Orders — `order.actions.ts`

| Action                   | Description                                             |
| ------------------------ | ------------------------------------------------------ |
| `createOrder`            | Create an order from the current cart                  |
| `getOrderById`           | Order with items and user                              |
| `getMyOrders`            | Signed-in user's orders (paginated)                    |
| `createPayPalOrder`      | Open a PayPal order for payment                        |
| `approvePayPalOrder`     | Capture and mark the PayPal payment paid               |
| `updateOrderToPaid`      | Mark an order paid + send the receipt email            |
| `updateOrderToPaidByCOD` | Mark a Cash-on-Delivery order paid _(admin)_           |
| `deliverOrder`           | Mark an order delivered _(admin)_                      |
| `getAllOrders`           | All orders, paginated _(admin)_                        |
| `getOrderSummary`        | Dashboard totals and monthly sales _(admin)_           |
| `deleteOrder`            | Delete an order _(admin)_                              |

### Reviews — `review.actions.ts`

| Action               | Description                                             |
| -------------------- | ------------------------------------------------------ |
| `createUpdateReview` | Create or update the user's review — gated on a paid order for that product; rolls up averages |
| `getReviews`         | Reviews for a product                                  |

### Wishlist — `wishlist.actions.ts`

| Action                  | Description                                              |
| ----------------------- | ------------------------------------------------------- |
| `toggleWishlist`        | Add or remove a product from the signed-in user's list  |
| `getMyWishlist`         | The user's saved products, newest first                 |
| `getWishlistProductIds` | IDs of saved products (seeds the heart's filled state)  |

### Promo Codes — `promo.actions.ts`

| Action          | Description                                          |
| --------------- | --------------------------------------------------- |
| `getAllPromos`  | Promo codes, searchable + paginated _(admin)_       |
| `getPromoById`  | Single promo code for editing _(admin)_             |
| `createPromo`   | Create a promo code _(admin)_                        |
| `updatePromo`   | Update a promo code _(admin)_                        |
| `deletePromo`   | Delete a promo code _(admin)_                        |

### Users — `user.actions.ts`

| Action                     | Description                                       |
| -------------------------- | ------------------------------------------------- |
| `signUpUser`               | Register with credentials                         |
| `signInWithCredentials`    | Sign in with email + password                     |
| `signOutUser`              | Sign out                                          |
| `getUserById`              | Fetch a user                                      |
| `updateProfile`            | Update the signed-in user's name / email          |
| `updateUserAddress`        | Save the shipping address                         |
| `updateUserPaymentMethod`  | Save the preferred payment method                 |
| `getAllUsers`              | All users, paginated _(admin)_                    |
| `updateUser`               | Update a user's name / role _(admin)_             |
| `deleteUser`               | Delete a user _(admin)_                           |

## 🗃️ <a name="data-model">Data Model</a>

Defined in [`prisma/schema.prisma`](prisma/schema.prisma) and backed by PostgreSQL.

| Model               | Purpose                                                                              |
| ------------------- | ------------------------------------------------------------------------------------ |
| `Product`           | Catalog item — slug, category, images, price, stock, rating, featured flag, banner   |
| `User`              | Account — name, email, hashed password, `role`, saved address and payment method     |
| `Cart`              | One cart per session or user — `items` JSON, itemized/shipping/tax/discount/total prices, and an optional applied promo code |
| `Order`             | Placed order — shipping address, payment method/result, totals (incl. discount and promo code), paid + delivered flags |
| `OrderItem`         | Line items on an order (product snapshot: name, slug, image, qty, price)              |
| `Review`            | Product review — rating, title, body, verified-purchase flag (writes are gated on a paid order for the product) |
| `Wishlist`          | Saved products per user — join table keyed on (`userId`, `productId`)                 |
| `Promo`             | Discount code — percentage, remaining redemptions, minimum order value, active window |
| `Account`, `Session`, `VerificationToken` | NextAuth / Prisma adapter tables                               |

Prices and ratings use SQL `Decimal` for precision; carts and shipping addresses are stored as `Json`. Deleting a `User` or `Product` cascades to its dependent rows.

## 🤸 <a name="quick-start">Quick Start</a>

Follow these steps to run the project locally.

**Prerequisites**

- 🌳 [Git](https://git-scm.com)
- 🟢 [Node.js](https://nodejs.org) (v18 or higher)
- 📦 [npm](https://npmjs.com)
- 🐘 A [PostgreSQL](https://www.postgresql.org) database (local, or a free hosted one — e.g. [Vercel Postgres](https://vercel.com/storage/postgres) or [Neon](https://neon.tech))

**Clone and install**

```bash
git clone https://github.com/ajfm88/prostore.git
cd prostore
npm install
```

> If you hit peer-dependency errors (some packages lag behind React 19), install with:
>
> ```bash
> npm install --legacy-peer-deps
> ```

**Set up environment variables**

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

```env
# Database
DATABASE_URL=

# Auth (NextAuth)
AUTH_SECRET=

# Encryption (password hashing)
ENCRYPTION_KEY=

# App
NEXT_PUBLIC_APP_NAME=ProStore
NEXT_PUBLIC_APP_DESCRIPTION=A modern ecommerce store built with Next.js
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# PayPal
PAYPAL_API_URL=https://api-m.sandbox.paypal.com
PAYPAL_CLIENT_ID=
PAYPAL_APP_SECRET=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Uploadthing
UPLOADTHING_TOKEN=

# Resend (email)
RESEND_API_KEY=
SENDER_EMAIL=

# OpenAI (AI product copy in the admin product form)
OPENAI_API_KEY=
```

Where each value comes from:

- **`DATABASE_URL`** — PostgreSQL connection string, e.g. `postgresql://user:password@host:5432/prostore`.
- **`AUTH_SECRET`** — session-signing secret. Generate one with `openssl rand -base64 32`.
- **`ENCRYPTION_KEY`** — secret key used to HMAC-hash passwords (`lib/encrypt.ts`). Generate one with `openssl rand -base64 32`.
- **`NEXT_PUBLIC_*`** — app name, description and public base URL.
- **`PAYPAL_*`** — [PayPal Developer](https://developer.paypal.com) dashboard → your app's client ID and secret. Keep the API URL on the sandbox host for testing.
- **`STRIPE_*`** — [Stripe](https://dashboard.stripe.com/apikeys) dashboard for the secret and publishable keys; the webhook secret comes from your webhook endpoint (or `stripe listen` locally).
- **`UPLOADTHING_TOKEN`** — [Uploadthing](https://uploadthing.com) dashboard → API keys.
- **`RESEND_API_KEY` / `SENDER_EMAIL`** — [Resend](https://resend.com) dashboard; the sender defaults to `onboarding@resend.dev` if omitted.
- **`OPENAI_API_KEY`** — [OpenAI](https://platform.openai.com/api-keys) dashboard. Powers the AI "Improve with AI" / "Generate with AI" buttons in the admin product form; used server-side only. Optional — the rest of the app runs without it, and only the two AI buttons need it.

Optional overrides (they have defaults in `lib/constants`) are listed at the bottom of `.env.example`: `LATEST_PRODUCTS_LIMIT`, `PAGE_SIZE`, `PAYMENT_METHODS`, `DEFAULT_PAYMENT_METHOD`, `USER_ROLES`.

**Set up the database**

```bash
npx prisma generate       # generate the client into lib/generated/prisma (also runs on install)
npx prisma migrate dev    # apply migrations and create the tables
npx tsx ./db/seed         # seed sample products and the demo accounts
```

**Run the app**

```bash
npm run dev      # start the dev server
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Other scripts**

```bash
npm run build    # production build
npm start        # run the production build
npm run lint     # ESLint
npm run email    # preview React Email templates at http://localhost:3001
```

**Prisma Studio**

Browse and edit the database in a GUI:

```bash
npx prisma studio
```

## 🧪 <a name="testing">Testing</a>

Jest (with `ts-jest`) covers the app's pure logic and the PayPal client:

- `tests/calc-price.test.ts` — cart pricing: item subtotal, the free-shipping threshold, promo-code discounts (minimum-order gating, tax on the pre-discount subtotal), and rounding.
- `tests/utils.test.ts` — the `round2`, `formatCurrency` and `formatError` helpers.
- `tests/paypal.test.ts` — the PayPal client.

```bash
npm test           # run once
npm run test:watch # watch mode
```

> The `calc-price` and `utils` suites are pure and need no configuration. The live PayPal tests hit the sandbox API and need valid `PAYPAL_*` credentials in your `.env`.

## 🔐 <a name="demo-accounts">Demo Accounts</a>

The seed script (see [Quick Start](#quick-start)) creates two accounts you can use to explore both sides of the app:

| Role  | Email               | Password |
| ----- | ------------------- | -------- |
| Admin | `admin@example.com` | `123456` |
| User  | `user@example.com`  | `123456` |

The **Admin** account unlocks `/admin` — the dashboard, and product, order, and user management.

## 🎬 <a name="tutorial">Tutorial</a>

This project is a heavily modified version of the following Udemy course:

<a href="https://www.udemy.com/course/nextjs-ecommerce-course"><img src="https://img.shields.io/badge/Udemy-Next.js_Ecommerce_Course-A435F0?style=for-the-badge&logo=udemy&logoColor=white"/></a>

## 🧬 <a name="related-builds">Related Builds</a>

<details><summary><b>Related ecommerce builds — source repos &amp; tutorials</b></summary>
<p>

Other similar projects found on YouTube

| Video | Stack | Repo | Channel |
| --- | --- | --- | --- |
| [Full Stack E-Commerce App with Admin Dashboard & CMS](https://www.youtube.com/watch?v=3JUsg-WsU9o) | Next.js + Payload CMS/MongoDB + Stripe | [adrianhajdin/ecommerce](https://github.com/adrianhajdin/ecommerce) | [JavaScript Mastery (1.26M)](https://www.youtube.com/@javascriptmastery) |
| [Multi-Vendor E-Commerce Marketplace](https://www.youtube.com/watch?v=6fXNWBFPfRM) | Next 15 App Router + Payload CMS/Mongo + tRPC | [code-with-antonio/next15-multitenant-ecommerce](https://github.com/code-with-antonio/next15-multitenant-ecommerce) | [Code With Antonio (419K)](https://www.youtube.com/@codewithantonio) |
| [Full-Stack E-Commerce App with Microservices Architecture](https://www.youtube.com/watch?v=O9YnPuKC4w4) | Turborepo + Next.js monorepo starter (WIP — microservices scaffold, no backend code yet) | [safak/microservices-ecommerce](https://github.com/safak/microservices-ecommerce) | [Lama Dev (361K)](https://www.youtube.com/@LamaDev) |
| [Ecommerce Website with NextJS 15, Stripe, TailwindCSS](https://www.youtube.com/watch?v=DLeAPn5-TIA) | Next 15 + Tailwind v4 + Zustand + Stripe (no backend DB) | [machadop1407/ecommerce-nextjs-fullstack-app](https://github.com/machadop1407/ecommerce-nextjs-fullstack-app) | [PedroTech (291K)](https://www.youtube.com/@PedroTechnologies) |
| [Complete E-Commerce Website (Next.js 15, Wix Studio)](https://www.youtube.com/watch?v=gr--RC_naa0) | Next 15 App Router + Wix Studio Headless + Tailwind/shadcn | [codinginflow/nextjs-15-wix-store](https://github.com/codinginflow/nextjs-15-wix-store) | [Coding in Flow (290K)](https://www.youtube.com/@codinginflow) |
| [Practical Typescript](https://www.youtube.com/watch?v=4EDuil3uQGw) | TypeScript course + React, shadcn/ui, React Router | [john-smilga/typescript-course](https://github.com/john-smilga/typescript-course) | [Coding Addict (199K)](https://www.youtube.com/@CodingAddict) |
| [Complete E-Commerce Shop with Next.js 14, Tailwind, React](https://www.youtube.com/watch?v=SG82Aqcaaa0) | Next 14 + Prisma + Kinde Auth + Stripe + Uploadthing | [joschan21/casecobra](https://github.com/joschan21/casecobra/) | [Josh tried coding (175K)](https://www.youtube.com/@joshtriedcoding) |
| [PERN Stack: Full Stack E-Commerce App](https://www.youtube.com/watch?v=sAH3rwO2H2o) | Express + Drizzle/Postgres + Clerk + React SPA | [burakorkmez/northwind-store](https://github.com/burakorkmez/northwind-store) | [Codesistency (156K)](https://www.youtube.com/@codesistency) |
| [PERN Stack: Full Stack Product Store](https://www.youtube.com/watch?v=y7kvxIQQxtQ) | Express + Drizzle/Postgres + Clerk + React SPA | [burakorkmez/productify](https://github.com/burakorkmez/productify) | [Codesistency (156K)](https://www.youtube.com/@codesistency) |
| [MERN Stack: Monster E-Commerce App with Admin Panel](https://www.youtube.com/watch?v=Byw6eSQ7Ff0) | Express + Mongoose + Clerk + React SPA | [acedevhub / mern-stack-full-course-2026](https://acedevhub.com/projects/mern-stack-full-course-2026) | [Sangam Mukherjee (97K)](https://www.youtube.com/@sangammukherjee) |
| [Most Beautiful eCommerce Website for Free](https://www.youtube.com/watch?v=dZV-y3GzBlg) | Static HTML + CSS + JavaScript | [codewithsadee/shoppie](https://github.com/codewithsadee/shoppie) | [codewithsadee (68.9K)](https://www.youtube.com/@codewithsadee) |
| [Enterprise-Level Food Ordering Platform](https://www.youtube.com/watch?v=ardeKHEN1j4) | Express + MongoDB/Mongoose + Auth0 + Stripe + Cloudinary | [chrisblakely01/mern-food-ordering-app-backend](https://github.com/chrisblakely01/mern-food-ordering-app-backend) | [Chris Blakely (52.9K)](https://www.youtube.com/@ChrisBlakely) |
| [Full Stack Blinkit Clone (MERN)](https://www.youtube.com/watch?v=sgJlE0utgHU) | Express + Mongoose + React SPA (Redux, react-router) | [IsAmitprajapati/BlinkIt-Clone-Full-Stack-Ecommerce](https://github.com/IsAmitprajapati/BlinkIt-Clone-Full-Stack-Ecommerce) | [Dynamic Coding with Amit (26.4K)](https://www.youtube.com/@DynamicCodingwithAmit) |
| [MERN AI Ecommerce Platform with Order Tracking](https://www.youtube.com/watch?v=cIZwzfQXFMw) | Express + Mongoose + React SPA (Vite, shadcn) | [TechWithEmmaYT/MERN-AI-Ecommerce-Platform](https://github.com/TechWithEmmaYT/MERN-AI-Ecommerce-Platform) | [TechWithEmma (12.8K)](https://www.youtube.com/@techwithemmaofficial) |
| [NextJS Full Course: Build a Car Dealer CMS](https://www.youtube.com/watch?v=c2GTfC-JVjU) | Next 15 + Prisma/Postgres + Auth.js + Tailwind v4 + AI SDK | [taylor-lindores-reeves/cdw](https://github.com/taylor-lindores-reeves/cdw) | [Taylor Lindores-Reeves (4.58K)](https://www.youtube.com/@taylorlindoresreeves) |
| [Build a TEMU E-Commerce Store with NextJS 15](https://www.youtube.com/watch?v=-_-kvPiMybw) | Next 15 App Router + Prisma + Sanity | [danablend/next-temu-clone-video](https://github.com/danablend/next-temu-clone-video) | [Daniel Holler (2.34K)](https://www.youtube.com/@daniel.holler) |

</p>
</details>
