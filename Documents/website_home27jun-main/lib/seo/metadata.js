const SITE_URL = process.env.SITE_URL || "https://atomo.in";

const siteConfig = {
  name: "Atomo Innovation",
  legalName: "Atomo Innovation Private Limited",
  tagline: "Building the intelligence layer for the physical world.",
  description:
    "Atomo brings real-time AI to industries, cities and critical infrastructure through an integrated edge computing platform built for speed, privacy and resilience.",
  url: SITE_URL,
  email: "hello@atomo.in",
  addresses: [
    {
      label: "India",
      lines: [
        "W-406, 4th Floor, Siddhraj Z Square",
        "Near Landmark Mall, Kudasan",
        "Gandhinagar 382421, India",
      ],
    },
    {
      label: "AI Center of Excellence",
      lines: [
        "13th Floor, Gift Tower One",
        "GIFT City, Gandhinagar",
        "Gujarat 382355, India",
      ],
    },
  ],
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61574809191751",
    x: "https://x.com/AtomoHQ",
    instagram: "https://www.instagram.com/atomo.in/",
    linkedin: "https://www.linkedin.com/company/atomo-in",
  },
};

function createMetadata({ title, description, path = "", image }) {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || `${siteConfig.url}/assets/brand/social-home.jpg`;
  return { title, description, path, url, ogImage };
}

function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/assets/brand/atomo-logo.png`,
    description: siteConfig.description,
    email: siteConfig.email,
    address: siteConfig.addresses.map((a) => ({
      "@type": "PostalAddress",
      streetAddress: a.lines[0],
      addressLocality: "Gandhinagar",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    })),
    sameAs: Object.values(siteConfig.social),
  };
}

function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

module.exports = { siteConfig, createMetadata, organizationJsonLd, breadcrumbJsonLd };
