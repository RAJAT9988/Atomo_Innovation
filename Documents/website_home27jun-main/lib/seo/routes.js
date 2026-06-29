const { productList } = require("../../content/products/index.js");
const { solutions } = require("../../content/solutions/index.js");

const staticRoutes = [
  "/",
  "/platform",
  "/platform/atomicos",
  "/platform/asnn-sdk",
  "/platform/atomic-center",
  "/platform/edge-hardware",
  "/platform/security",
  "/solutions",
  "/products",
  "/products/compare",
  "/developers",
  "/developers/documentation",
  "/developers/ai-engineer-program",
  "/developers/remote-access",
  "/support",
  "/company",
  "/company/about",
  "/company/founder-vision",
  "/company/leadership",
  "/company/advisors",
  "/company/governance",
  "/company/recognition",
  "/company/careers",
  "/resources",
  "/resources/case-studies",
  "/resources/insights",
  "/resources/videos",
  "/newsroom",
  "/press-kit",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
];

function getAllRoutes() {
  return [
    ...staticRoutes,
    ...solutions.map((s) => `/solutions/${s.slug}`),
    ...productList.map((p) => `/products/${p.slug}`),
  ];
}

module.exports = { staticRoutes, getAllRoutes };
