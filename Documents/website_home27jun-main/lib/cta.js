const ctaMap = {
  talk: { label: "Talk to Atomo", href: "/contact", variant: "primary" },
  platform: { label: "Explore the Platform", href: "/platform", variant: "primary" },
  deployment: { label: "Plan a Deployment", href: "/contact?interest=enterprise", variant: "primary" },
  product: { label: "Discuss Your Deployment", href: "/contact?interest=product", variant: "primary" },
  developer: { label: "Build with Atomo", href: "/developers", variant: "primary" },
  investor: { label: "Discover the Vision", href: "/company/founder-vision", variant: "secondary" },
  partner: { label: "Partner with Atomo", href: "/contact?interest=partnership", variant: "primary" },
  career: { label: "Join the Mission", href: "/company/careers", variant: "primary" },
  support: { label: "Get Support", href: "/support", variant: "secondary-light" },
  vision: { label: "Watch the Atomo Vision", href: "/resources/videos", variant: "secondary" },
};

function getCta(type, overrideLabel, overrideHref, className = "") {
  const cta = ctaMap[type] || ctaMap.talk;
  const variant = cta.variant || "primary";
  let baseClasses =
    variant === "primary"
      ? "btn-primary"
      : variant === "secondary-light"
        ? "btn-secondary-light"
        : "btn-secondary";
  if (className.includes("btn-")) baseClasses = className;
  else if (className) baseClasses = `${baseClasses} ${className}`;
  return {
    href: overrideHref || cta.href,
    label: overrideLabel || cta.label,
    className: baseClasses.trim(),
  };
}

module.exports = { ctaMap, getCta };
