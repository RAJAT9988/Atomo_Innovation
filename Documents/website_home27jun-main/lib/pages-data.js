const { solutions } = require("../content/solutions/index.js");
const { productList } = require("../content/products/index.js");

const staticPages = [
  {
    path: "/platform",
    title: "The Atomo Platform | Edge AI Infrastructure",
    description:
      "From intelligent hardware to operating systems, AI deployment and fleet management — the full stack for edge AI infrastructure.",
    hero: {
      eyebrow: "Atomo Platform",
      headline: "The Full Stack for Edge AI Infrastructure.",
      description:
        "From intelligent hardware to operating systems, AI deployment and fleet management, Atomo brings every critical layer together in one edge-native platform.",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Platform" }],
      cta: { type: "platform" },
    },
    sections: [
      {
        type: "content",
        blocks: [
          { tag: "h2", class: "section-headline-secondary text-dark-text", text: "What is Edge AI Infrastructure?" },
          { tag: "p", class: "mt-4 text-base text-dark-text/75", text: "Edge AI infrastructure is the integrated hardware, software and management layer that enables real-time AI to operate where physical systems generate data — factories, cities, construction sites, transportation networks and critical infrastructure." },
          { tag: "h2", class: "section-headline-secondary mt-16 text-dark-text", text: "Platform layers" },
          {
            type: "grid",
            columns: 2,
            items: [
              { title: "Edge Hardware", description: "Purpose-built Atomo Processing Units for physical environments." },
              { title: "AtomicOS", description: "Edge-native operating environment optimized for AI workloads." },
              { title: "ASNN SDK", description: "AI deployment, optimization and developer tooling." },
              { title: "Atomic Center", description: "Fleet deployment, monitoring and centralized management." },
            ],
          },
          { type: "cta", cta: { type: "deployment" } },
        ],
      },
    ],
  },
  {
    path: "/platform/atomicos",
    title: "AtomicOS | Edge-Native Operating Environment | Atomo",
    description:
      "AtomicOS is Atomo's edge-native operating environment optimized for real-time AI, device connectivity and resilient local execution.",
    hero: {
      eyebrow: "Platform Layer",
      headline: "AtomicOS — Intelligence at the Edge.",
      description:
        "An edge-native operating environment designed to run AI workloads, manage device connectivity and execute automations locally — without depending on continuous cloud connectivity.",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Platform", href: "/platform" }, { label: "AtomicOS" }],
      cta: { type: "deployment" },
    },
    sections: [{ type: "content", blocks: [
      { type: "placeholder", label: "AtomicOS" },
      { tag: "h2", class: "section-headline-secondary text-dark-text", text: "Built for edge AI execution" },
      { tag: "p", class: "mt-4 text-base text-dark-text/75", text: "AtomicOS provides the runtime layer that connects Atomo hardware, AI models and fleet management into a cohesive edge-native stack." },
      { type: "list", items: ["Edge-optimized kernel and runtime for AI workloads", "Secure local execution with optional cloud sync", "Over-the-air updates for distributed deployments", "Native integration with ASNN SDK and Atomic Center"] },
      { type: "cta", cta: { type: "developer" } },
    ]}],
  },
  {
    path: "/platform/asnn-sdk",
    title: "ASNN SDK | Atomo Edge AI Deployment",
    description: "Deploy, optimize and manage AI workloads on Atomo edge hardware with the ASNN SDK.",
    hero: {
      eyebrow: "Platform Layer",
      headline: "ASNN SDK — Deploy AI at the Edge.",
      description: "Developer tools for model conversion, NPU optimization and multi-model deployment on Atomo Processing Units.",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Platform", href: "/platform" }, { label: "ASNN SDK" }],
      cta: { type: "developer" },
    },
    sections: [{ type: "content", blocks: [
      { type: "placeholder", label: "ASNN SDK" },
      { tag: "p", class: "text-base text-dark-text/75", text: "The ASNN SDK supports model conversion from common frameworks, NPU-accelerated inference and fleet deployment patterns through Atomic Center." },
      { type: "cta", cta: { type: "developer", href: "/developers/documentation", label: "View documentation" } },
    ]}],
  },
  {
    path: "/platform/atomic-center",
    title: "Atomic Center | Fleet Management | Atomo",
    description: "Centralized deployment, monitoring and management for distributed Atomo edge devices.",
    hero: {
      eyebrow: "Platform Layer",
      headline: "Atomic Center — Manage Your Edge Fleet.",
      description: "Deploy, monitor and manage distributed Atomo devices from a centralized environment built for edge operations.",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Platform", href: "/platform" }, { label: "Atomic Center" }],
      cta: { type: "deployment" },
    },
    sections: [{ type: "content", blocks: [
      { type: "placeholder", label: "Atomic Center" },
      { tag: "p", class: "text-base text-dark-text/75", text: "Atomic Center provides fleet visibility, alert management, OTA updates and deployment orchestration across distributed edge installations." },
      { type: "cta", cta: { type: "deployment" } },
    ]}],
  },
  {
    path: "/platform/edge-hardware",
    title: "Edge Hardware | Atomo Processing Units",
    description: "Purpose-built Atomo Processing Units — Electron, Proton and Neutron — for edge AI deployments.",
    hero: {
      eyebrow: "Platform Layer",
      headline: "Purpose-Built Edge Hardware.",
      description: "Atomo Processing Units are designed for real-world environments where intelligence must operate close to cameras, machines and sensors.",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Platform", href: "/platform" }, { label: "Edge Hardware" }],
      cta: { type: "product" },
    },
    sections: [{ type: "content", blocks: [
      { type: "link-grid", links: productList.map((p) => ({ href: `/products/${p.slug}`, title: p.name, description: p.positioning })) },
      { type: "cta", cta: { type: "product", href: "/products/compare", label: "Compare products" } },
    ]}],
  },
  {
    path: "/platform/security",
    title: "Security & Trust | Atomo Platform",
    description: "Privacy, resilience and secure communications built into Atomo edge AI infrastructure by design.",
    hero: {
      eyebrow: "Platform Layer",
      headline: "Private by Architecture. Resilient by Design.",
      description: "Atomo edge infrastructure is designed for local data processing, reduced raw-data movement and operational resilience.",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Platform", href: "/platform" }, { label: "Security & Trust" }],
      cta: { type: "deployment" },
    },
    sections: [{ type: "content", blocks: [
      { tag: "p", class: "text-base text-dark-text/75", text: "Security at Atomo means local processing, controlled data ownership, secure device communications and responsible AI deployment patterns — not bolt-on cloud dependencies." },
      { type: "list", items: ["Local data processing at the edge", "Reduced raw video and sensor transmission", "Secure update architecture", "Access control and responsible AI principles"] },
      { type: "cta", cta: { type: "talk" } },
    ]}],
  },
  {
    path: "/solutions",
    view: "pages/solutions-list",
    title: "Industry Solutions | Atomo Edge AI",
    description: "Edge AI solutions for manufacturing, smart cities, construction, critical infrastructure and more.",
    hero: {
      eyebrow: "Solutions",
      headline: "Intelligence for the Systems the World Depends On.",
      description: "Industry-specific edge AI deployments built on the Atomo platform.",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Solutions" }],
      cta: { type: "deployment" },
    },
  },
  {
    path: "/products",
    view: "pages/products-list",
    title: "Atomo Edge Hardware | Electron, Proton & Neutron",
    description: "Purpose-built Atomo Processing Units for industrial, infrastructure and distributed edge AI deployments.",
    hero: {
      eyebrow: "Edge Hardware",
      headline: "Purpose-Built Edge Hardware.",
      description: "Atomo Processing Units are designed for real-world environments where intelligence must operate close to cameras, machines and sensors.",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Products" }],
      cta: { type: "product" },
    },
  },
  {
    path: "/developers",
    title: "Developers | Atomo Edge AI Platform",
    description: "Build, deploy and manage AI workloads on Atomo edge infrastructure.",
    hero: {
      eyebrow: "Developers",
      headline: "Build on the Edge.",
      description: "Documentation, programs and tools for developers building production edge AI on Atomo hardware and software.",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Developers" }],
      cta: { type: "developer" },
    },
    sections: [{ type: "content", blocks: [
      { type: "link-grid", links: [
        { href: "/developers/documentation", title: "Documentation", description: "Guides, API references and deployment workflows." },
        { href: "/developers/ai-engineer-program", title: "AI Engineer Program", description: "Structured program for production edge AI workloads." },
        { href: "/developers/remote-access", title: "Remote Access Program", description: "Secure remote access to Atomo hardware." },
        { href: "/support", title: "Support", description: "Technical support for developers and deployment teams." },
      ]},
    ]}],
  },
  {
    path: "/developers/documentation",
    title: "Developer Documentation | Atomo",
    description: "Documentation for AtomicOS, ASNN SDK and Atomo edge hardware.",
    hero: {
      eyebrow: "Developers",
      headline: "Developer Documentation.",
      description: "Guides and references for building, deploying and managing AI workloads on Atomo edge infrastructure.",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Developers", href: "/developers" }, { label: "Documentation" }],
      cta: { type: "developer", href: "/contact?interest=developer", label: "Request documentation access" },
    },
    sections: [{ type: "content", blocks: [
      { tag: "p", class: "text-base text-dark-text/75", text: "Full documentation is being migrated to this site. Contact developer relations for early access to guides, API references and sample projects." },
    ]}],
  },
  {
    path: "/developers/ai-engineer-program",
    title: "AI Engineer Program | Atomo",
    description: "Structured program for AI engineers building production edge AI workloads on Atomo.",
    hero: {
      eyebrow: "Developers",
      headline: "AI Engineer Program.",
      description: "Hands-on training and mentorship for engineers deploying production AI at the edge.",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Developers", href: "/developers" }, { label: "AI Engineer Program" }],
      cta: { type: "developer", href: "/contact?interest=developer" },
    },
    sections: [{ type: "content", blocks: [
      { tag: "p", class: "text-base text-dark-text/75", text: "The AI Engineer Program provides structured learning paths for model deployment, hardware integration and fleet management on the Atomo platform." },
      { type: "cta", cta: { type: "developer", href: "/contact?interest=developer", label: "Apply for the program" } },
    ]}],
  },
  {
    path: "/developers/remote-access",
    title: "Remote Access Program | Atomo",
    description: "Secure remote access to Atomo hardware for development, testing and validation.",
    hero: {
      eyebrow: "Developers",
      headline: "Remote Access Program.",
      description: "Secure hardware access for development, testing and validation of edge AI workloads.",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Developers", href: "/developers" }, { label: "Remote Access" }],
      cta: { type: "developer", href: "/contact?interest=developer" },
    },
    sections: [{ type: "content", blocks: [
      { tag: "p", class: "text-base text-dark-text/75", text: "Qualified developers can access Atomo hardware remotely for integration testing and validation before field deployment." },
    ]}],
  },
  {
    path: "/support",
    title: "Support | Atomo",
    description: "Technical support and resources for Atomo edge AI deployments.",
    hero: {
      eyebrow: "Support",
      headline: "How can we help?",
      description: "Support resources for developers, deployment teams and enterprise customers.",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Support" }],
      cta: { type: "support" },
    },
    sections: [{ type: "content", blocks: [
      { type: "link-grid", links: [
        { href: "/contact?interest=support", title: "Contact support", description: "Submit a support request to the Atomo team." },
        { href: "/developers/documentation", title: "Developer documentation", description: "Guides and references for platform development." },
        { href: "/developers/remote-access", title: "Remote access program", description: "Secure hardware access for development and testing." },
        { href: "/contact?interest=enterprise", title: "Plan a deployment", description: "Enterprise deployment and integration support." },
      ]},
    ]}],
  },
  {
    path: "/company",
    title: "Company | Atomo Innovation",
    description: "About Atomo Innovation — edge AI infrastructure for the physical world.",
    hero: {
      eyebrow: "Company",
      headline: "Building the Intelligence Layer for the Physical World.",
      description: "Atomo Innovation brings integrated edge AI infrastructure to industries, cities and critical infrastructure.",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Company" }],
      cta: { type: "vision" },
    },
    sections: [{ type: "content", blocks: [
      { type: "link-grid", links: [
        { href: "/company/about", title: "About Atomo", description: "Mission, locations and company overview." },
        { href: "/company/founder-vision", title: "Founder Vision", description: "The vision behind Atomo edge AI infrastructure." },
        { href: "/company/leadership", title: "Leadership", description: "The team building Atomo." },
        { href: "/company/careers", title: "Careers", description: "Join the mission." },
        { href: "/company/recognition", title: "Recognition & Impact", description: "Ecosystem recognition and impact." },
      ]},
    ]}],
  },
  {
    path: "/company/about",
    title: "About Atomo | Edge AI Infrastructure Company",
    description: "Atomo Innovation builds integrated edge AI infrastructure — headquartered in Gandhinagar, India.",
    hero: {
      eyebrow: "Company",
      headline: "About Atomo Innovation.",
      description: "We bring real-time AI to industries, cities and critical infrastructure through an integrated edge computing platform.",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Company", href: "/company" }, { label: "About" }],
      cta: { type: "vision" },
    },
    sections: [{ type: "content", blocks: [
      { tag: "h2", class: "section-headline-secondary text-dark-text", text: "Our mission" },
      { tag: "p", class: "mt-4 text-base text-dark-text/75", text: "The physical world cannot wait for every decision to travel to the cloud. Atomo builds the infrastructure that allows intelligence to operate where it creates the greatest impact." },
      { type: "addresses" },
      { type: "cta", cta: { type: "talk" } },
    ]}],
  },
  {
    path: "/company/founder-vision",
    title: "Founder Vision | Atomo",
    description: "The vision behind Atomo — intelligence where decisions are made.",
    hero: {
      eyebrow: "Company",
      headline: "Intelligence Belongs Everywhere.",
      description: "Atomo was founded on the belief that the physical world needs infrastructure for real-time, local intelligence.",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Company", href: "/company" }, { label: "Founder Vision" }],
      cta: { type: "investor" },
    },
    sections: [{ type: "content", blocks: [
      { tag: "p", class: "text-base text-dark-text/75", text: "We created Atomo because the physical world cannot wait for every decision to travel to the cloud. Our mission is to build the infrastructure that allows intelligence to operate where it creates the greatest impact." },
      { type: "cta", cta: { type: "investor" } },
    ]}],
  },
  {
    path: "/company/leadership",
    title: "Leadership | Atomo Innovation",
    description: "Leadership team at Atomo Innovation — edge AI infrastructure for the physical world.",
    hero: {
      eyebrow: "Company",
      headline: "Leadership.",
      description: "The team building edge AI infrastructure for industries, cities and critical infrastructure.",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Company", href: "/company" }, { label: "Leadership" }],
    },
    sections: [{ type: "content", blocks: [
      { tag: "p", class: "text-base text-dark-text/75", text: "Leadership profiles are being prepared for publication. Contact us for media and investor inquiries." },
      { type: "cta", cta: { type: "talk" } },
    ]}],
  },
  {
    path: "/company/advisors",
    title: "Advisors | Atomo Innovation",
    description: "Strategic advisors supporting Atomo Innovation's edge AI infrastructure mission.",
    hero: {
      eyebrow: "Company",
      headline: "Advisors.",
      description: "Strategic advisors supporting Atomo's mission to build edge AI infrastructure for the physical world.",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Company", href: "/company" }, { label: "Advisors" }],
    },
    sections: [{ type: "content", blocks: [
      { tag: "p", class: "text-base text-dark-text/75", text: "Advisor profiles require management approval before publication." },
    ]}],
  },
  {
    path: "/company/governance",
    title: "Governance | Atomo Innovation",
    description: "Corporate governance and responsible AI principles at Atomo Innovation.",
    hero: {
      eyebrow: "Company",
      headline: "Governance.",
      description: "Responsible practices for building and deploying edge AI infrastructure.",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Company", href: "/company" }, { label: "Governance" }],
    },
    sections: [{ type: "content", blocks: [
      { tag: "p", class: "text-base text-dark-text/75", text: "Atomo is committed to responsible AI deployment, data privacy and transparent governance as edge intelligence scales across critical systems." },
    ]}],
  },
  {
    path: "/company/recognition",
    view: "pages/recognition",
    title: "Recognition & Impact | Atomo",
    description: "Ecosystem recognition and impact programs supporting Atomo Innovation.",
    hero: {
      eyebrow: "Company",
      headline: "Recognized by the Ecosystem Building the Future.",
      description: "Atomo participates in innovation programs and ecosystem initiatives across India and globally.",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Company", href: "/company" }, { label: "Recognition" }],
    },
  },
  {
    path: "/company/careers",
    title: "Careers | Atomo Innovation",
    description: "Join Atomo Innovation — build edge AI infrastructure for the physical world.",
    hero: {
      eyebrow: "Company",
      headline: "Join the Mission.",
      description: "Build edge AI infrastructure that operates where industries, cities and critical systems need intelligence most.",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Company", href: "/company" }, { label: "Careers" }],
      cta: { type: "career" },
    },
    sections: [{ type: "content", blocks: [
      { type: "grid", columns: 2, items: [
        { title: "Impact at the edge", description: "Engineering that matters where machines, cities and infrastructure operate." },
        { title: "Privacy by design", description: "Privacy, speed and resilience are architectural principles — not afterthoughts." },
        { title: "Full-stack platform", description: "Hardware, software and AI integrated into one coherent platform." },
        { title: "India roots, global vision", description: "Headquartered in Gandhinagar with presence at GIFT City AI Center of Excellence." },
      ]},
      { type: "cta", cta: { type: "career", href: "/contact?interest=career", label: "Get in touch about careers" } },
    ]}],
  },
  {
    path: "/resources",
    title: "Resources | Atomo",
    description: "Case studies, insights, videos and press resources from Atomo Innovation.",
    hero: {
      eyebrow: "Resources",
      headline: "Resources.",
      description: "Case studies, insights, videos and press materials from Atomo Innovation.",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Resources" }],
    },
    sections: [{ type: "content", blocks: [
      { type: "link-grid", links: [
        { href: "/resources/case-studies", title: "Case Studies", description: "Real-world edge AI deployments and outcomes." },
        { href: "/resources/insights", title: "Insights", description: "Articles and perspectives on edge AI infrastructure." },
        { href: "/resources/videos", title: "Videos", description: "Product demos, platform overviews and vision content." },
        { href: "/press-kit", title: "Press Kit", description: "Brand assets and media resources." },
      ]},
    ]}],
  },
  {
    path: "/resources/case-studies",
    title: "Case Studies | Atomo",
    description: "Real-world edge AI deployment case studies from Atomo Innovation.",
    hero: {
      eyebrow: "Resources",
      headline: "Case Studies.",
      description: "Real-world edge AI deployments and outcomes — coming soon.",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }, { label: "Case Studies" }],
    },
    sections: [{ type: "content", blocks: [
      { tag: "p", class: "text-base text-dark-text/75", text: "Case studies are being prepared for publication. Contact us for deployment references." },
      { type: "cta", cta: { type: "deployment" } },
    ]}],
  },
  {
    path: "/resources/insights",
    title: "Insights | Atomo",
    description: "Articles and perspectives on edge AI infrastructure from Atomo Innovation.",
    hero: {
      eyebrow: "Resources",
      headline: "Insights.",
      description: "Articles and perspectives on edge AI, physical intelligence and infrastructure — coming soon.",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }, { label: "Insights" }],
    },
    sections: [{ type: "content", blocks: [
      { tag: "p", class: "text-base text-dark-text/75", text: "Insight articles are being migrated from our previous site. Subscribe via contact for updates." },
    ]}],
  },
  {
    path: "/resources/videos",
    title: "Videos | Atomo",
    description: "Product demos, platform overviews and vision content from Atomo Innovation.",
    hero: {
      eyebrow: "Resources",
      headline: "Videos.",
      description: "Product demos, platform overviews and the Atomo vision.",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }, { label: "Videos" }],
      cta: { type: "vision" },
    },
    sections: [{ type: "content", blocks: [
      { tag: "p", class: "text-base text-dark-text/75", text: "Video library is being migrated. Visit our platform and product pages for demo content." },
    ]}],
  },
  {
    path: "/newsroom",
    title: "Newsroom | Atomo Innovation",
    description: "Latest news, announcements and media coverage from Atomo Innovation.",
    hero: {
      eyebrow: "Company",
      headline: "Newsroom.",
      description: "Latest news, announcements and media coverage — coming soon.",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Newsroom" }],
    },
    sections: [{ type: "content", blocks: [
      { tag: "p", class: "text-base text-dark-text/75", text: "News and announcements are being prepared for publication. Media inquiries: hello@atomo.in" },
    ]}],
  },
  {
    path: "/press-kit",
    title: "Press Kit | Atomo Innovation",
    description: "Brand assets and media resources for Atomo Innovation.",
    hero: {
      eyebrow: "Resources",
      headline: "Press Kit.",
      description: "Brand assets, logos and media resources for press and partners.",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Press Kit" }],
    },
    sections: [{ type: "content", blocks: [
      { tag: "p", class: "text-base text-dark-text/75", text: "Press kit downloads are being prepared. Contact media relations for brand assets." },
      { type: "cta", cta: { type: "talk", href: "/contact?interest=media", label: "Media inquiry" } },
    ]}],
  },
  {
    path: "/privacy",
    view: "pages/legal",
    legalType: "privacy",
    title: "Privacy Policy | Atomo Innovation",
    description: "Privacy policy for Atomo Innovation website and services.",
  },
  {
    path: "/terms",
    view: "pages/legal",
    legalType: "terms",
    title: "Terms of Service | Atomo Innovation",
    description: "Terms of service for Atomo Innovation website and services.",
  },
  {
    path: "/cookies",
    view: "pages/legal",
    legalType: "cookies",
    title: "Cookie Settings | Atomo Innovation",
    description: "Cookie policy for Atomo Innovation website.",
  },
];

module.exports = { staticPages, solutions, productList };
