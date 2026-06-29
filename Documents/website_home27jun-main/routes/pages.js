const express = require("express");
const { createMetadata, siteConfig, breadcrumbJsonLd, organizationJsonLd } = require("../lib/seo/metadata");
const { getAllRoutes } = require("../lib/seo/routes");
const { getProduct, productList } = require("../content/products/index.js");
const { getSolution, solutions } = require("../content/solutions/index.js");
const { getApprovedValue, getApprovedValues } = require("../lib/content/verification");
const { staticPages } = require("../lib/pages-data");

const router = express.Router();

function renderPage(res, view, { path, meta, ...locals }) {
  res.render(view, { ...locals, path, meta, site: siteConfig }, (err, body) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    res.render("layout", {
      body,
      meta,
      path,
      site: siteConfig,
      year: new Date().getFullYear(),
      orgJsonLd: organizationJsonLd(),
      jsonLd: locals.jsonLd,
      loadContactJs: locals.loadContactJs,
      loadHomeAssets: locals.loadHomeAssets,
    });
  });
}

router.get("/", (req, res) => {
  renderPage(res, "home/home.html", {
    path: "/",
    meta: createMetadata({
      title: "Atomo | Edge AI Infrastructure for the Physical World",
      description: siteConfig.description,
      path: "/",
    }),
    solutions,
    productList,
    loadHomeAssets: true,
  });
});

router.get("/sitemap.xml", (req, res) => {
  const now = new Date().toISOString();
  const urls = getAllRoutes()
    .map(
      (p) =>
        `  <url><loc>${siteConfig.url}${p === "/" ? "" : p}</loc><lastmod>${now}</lastmod></url>`,
    )
    .join("\n");
  res.type("application/xml").send(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`,
  );
});

router.get("/robots.txt", (req, res) => {
  res.type("text/plain").send(
    `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${siteConfig.url}/sitemap.xml\nHost: ${siteConfig.url}\n`,
  );
});

router.get("/llms.txt", (req, res) => {
  const routes = getAllRoutes();
  const body = `# ${siteConfig.name}

> ${siteConfig.tagline}

${siteConfig.description}

## Contact

- Email: ${siteConfig.email}
- Website: ${siteConfig.url}

## Key pages

${routes.map((p) => `- ${siteConfig.url}${p === "/" ? "" : p}`).join("\n")}

## About

${siteConfig.legalName} builds integrated edge AI infrastructure — from purpose-built hardware to
AtomicOS, ASNN SDK and Atomic Center fleet management.
`;
  res.type("text/plain").send(body);
});

router.get("/rss.xml", (req, res) => {
  const items = getAllRoutes()
    .map(
      (p) => `    <item>
      <title>${p === "/" ? "Home" : p}</title>
      <link>${siteConfig.url}${p === "/" ? "" : p}</link>
      <description>Atomo Innovation — ${siteConfig.tagline}</description>
    </item>`,
    )
    .join("\n");
  res.type("application/xml").send(
    `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n<channel>\n<title>${siteConfig.name}</title>\n<link>${siteConfig.url}</link>\n<description>${siteConfig.description}</description>\n${items}\n</channel>\n</rss>`,
  );
});

router.get("/manifest.webmanifest", (req, res) => {
  res.json({
    name: siteConfig.name,
    short_name: "Atomo",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#071a35",
    theme_color: "#00e5ff",
    icons: [{ src: "/assets/brand/atomo-logo.png", sizes: "512x512", type: "image/png" }],
  });
});

router.get("/products/compare", (req, res) => {
  const specLabels = [];
  for (const product of productList) {
    for (const spec of product.specs) {
      if (getApprovedValue(spec.value)) specLabels.push(spec.label);
    }
  }
  renderPage(res, "pages/compare", {
    path: "/products/compare",
    meta: createMetadata({
      title: "Compare Atomo Processing Units | Electron, Proton & Neutron",
      description:
        "Compare Electron, Proton and Neutron specifications side by side. Only verified specifications are shown.",
      path: "/products/compare",
    }),
    specLabels: [...new Set(specLabels)],
    productList,
  });
});

router.get("/products/:slug", (req, res) => {
  const product = getProduct(req.params.slug);
  if (!product) return res.status(404).render("404", { meta: { title: "Not Found" }, path: req.path });

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: product.name },
  ];

  renderPage(res, "pages/product", {
    path: `/products/${product.slug}`,
    meta: createMetadata({
      title: product.seoTitle,
      description: product.seoDescription,
      path: `/products/${product.slug}`,
    }),
    product,
    breadcrumbs,
    jsonLd: breadcrumbJsonLd(
      breadcrumbs.map((b) => ({
        name: b.label,
        url: b.href ? `${siteConfig.url}${b.href}` : `${siteConfig.url}/products/${product.slug}`,
      })),
    ),
  });
});

router.get("/solutions/:slug", (req, res) => {
  const solution = getSolution(req.params.slug);
  if (!solution) return res.status(404).render("404", { meta: { title: "Not Found" }, path: req.path });

  renderPage(res, "pages/solution", {
    path: `/solutions/${solution.slug}`,
    meta: createMetadata({
      title: solution.seoTitle,
      description: solution.seoDescription,
      path: `/solutions/${solution.slug}`,
    }),
    solution,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Solutions", href: "/solutions" },
      { label: solution.name },
    ],
  });
});

router.get("/contact", (req, res) => {
  const valid = ["general", "enterprise", "product", "partnership", "developer", "media", "career", "support"];
  const interest = valid.includes(req.query.interest) ? req.query.interest : "general";
  renderPage(res, "pages/contact", {
    path: "/contact",
    meta: createMetadata({
      title: "Contact Atomo | Edge AI Infrastructure",
      description:
        "Contact Atomo Innovation for deployment inquiries, developer programs, partnerships, media and careers.",
      path: "/contact",
    }),
    interest,
    breadcrumbs: [{ label: "Home", href: "/" }, { label: "Contact" }],
    loadContactJs: true,
  });
});

// Static pages from manifest
for (const page of staticPages) {
  router.get(page.path, (req, res) => {
    const { recognitionItems } = require("../content/recognition/index.js");
    renderPage(res, page.view || "pages/standard", {
      path: page.path,
      meta: createMetadata({ title: page.title, description: page.description, path: page.path }),
      page,
      solutions,
      productList,
      recognitionItems,
    });
  });
}

module.exports = router;
