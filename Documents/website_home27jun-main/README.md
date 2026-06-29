# Atomo Innovation Website

Node.js website for [Atomo Innovation](https://atomo.in) — edge AI infrastructure for industries, cities and critical infrastructure.

## Stack

- **Node.js** + **Express**
- **EJS** HTML templates
- **Tailwind CSS 4** (compiled to static CSS)
- **Zod** for contact form validation
- **Vitest** for unit tests

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Optional: set `SITE_URL` for production canonical URLs and sitemap.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Build CSS and start the server |
| `npm run start` | Production server |
| `npm run build` | Compile Tailwind CSS |
| `npm run build:css` | Compile `public/css/input.css` → `public/css/styles.css` |
| `npm run test` | Run Vitest unit tests |

## Project structure

```
server.js           # Express entry point
routes/             # Page routes and API handlers
views/              # EJS templates (HTML)
lib/                # SEO, navigation, validation, page data
content/            # Product, solution, and company content (JS)
public/             # Static assets, compiled CSS, client JS
tests/              # Unit tests
```

## Contact form

The contact form at `/contact` posts to `/api/contact` with Zod validation, honeypot spam protection and in-memory rate limiting.

## SEO & discovery

- `/sitemap.xml`
- `/robots.txt`
- `/rss.xml`
- `/llms.txt`
- `/manifest.webmanifest`

Legacy URL redirects (e.g. `/electron.html` → `/products/electron`) are defined in `lib/navigation.js`.

## Deployment

Run `npm run build:css && npm start` on any Node.js host. Set `PORT` and `SITE_URL` as needed.
# website_home27jun
