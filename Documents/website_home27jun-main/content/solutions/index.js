const solutions = [
  {
    slug: "manufacturing",
    name: "Manufacturing",
    headline: "Real-Time Intelligence on the Factory Floor.",
    challenge:
      "Manufacturing environments require immediate decisions without sending every camera stream and sensor event to the cloud.",
    cloudLimitation:
      "Cloud-only architectures introduce latency, bandwidth costs and operational fragility when connectivity is interrupted on active production lines.",
    capabilities: [
      "Local machine vision and quality inspection",
      "Worker safety monitoring and PPE detection",
      "Equipment and sensor integration via industrial I/O",
      "Multi-model AI processing at the edge",
    ],
    useCases: [
      "Quality inspection",
      "Machine vision",
      "Worker safety",
      "Equipment monitoring",
      "Process visibility",
      "Predictive intelligence",
    ],
    outcomes: [
      "Faster response to production anomalies",
      "Reduced bandwidth dependency",
      "Stronger operational control on the line",
    ],
    products: ["electron"],
    platformLayers: ["Edge Hardware", "AtomicOS", "ASNN SDK", "Atomic Center"],
    image: "/assets/industries/manufacturing.png",
    seoTitle: "Manufacturing Edge AI | Atomo",
    seoDescription:
      "Deploy real-time edge AI for manufacturing with local machine vision, safety monitoring and industrial integration.",
  },
  {
    slug: "smart-cities",
    name: "Smart Cities",
    headline: "Local Intelligence for Urban Systems.",
    challenge:
      "Cities generate vast volumes of video and sensor data that cannot efficiently or privately be processed entirely in distant cloud infrastructure.",
    cloudLimitation:
      "Continuous transmission of high-volume camera feeds creates bandwidth strain, privacy concerns and delayed response for public safety events.",
    capabilities: [
      "Local camera processing and event detection",
      "Traffic and crowd intelligence",
      "Fire and smoke detection",
      "Infrastructure monitoring with edge alerts",
    ],
    useCases: [
      "Public safety",
      "Traffic intelligence",
      "Crowd monitoring",
      "Fire and smoke detection",
      "Infrastructure monitoring",
      "Emergency response support",
    ],
    outcomes: [
      "Faster incident response",
      "Reduced raw video transmission",
      "Privacy-conscious local processing",
    ],
    products: ["electron", "proton"],
    platformLayers: ["Edge Hardware", "AtomicOS", "ASNN SDK", "Atomic Center"],
    image: "/assets/industries/smart-city.png",
    seoTitle: "Smart City Edge AI | Atomo",
    seoDescription:
      "Enable local AI processing for smart cities with edge intelligence for safety, traffic and infrastructure monitoring.",
  },
  {
    slug: "construction",
    name: "Construction",
    headline: "Site Intelligence Where Projects Happen.",
    challenge:
      "Construction sites are dynamic, often disconnected environments where safety, access control and progress visibility require immediate local decisions.",
    cloudLimitation:
      "Intermittent connectivity and high camera volume make cloud-only monitoring unreliable and slow for time-sensitive site events.",
    capabilities: [
      "Worker safety and PPE detection",
      "Access control and perimeter monitoring",
      "Progress and material movement visibility",
      "Centralized alerts from distributed edge devices",
    ],
    useCases: [
      "PPE detection",
      "Authorized access monitoring",
      "Vehicle and goods movement",
      "Fire and smoke detection",
      "Progress monitoring",
      "Centralized project alerts",
    ],
    outcomes: [
      "Improved site safety response",
      "Better project visibility",
      "Operation during limited connectivity",
    ],
    products: ["electron", "proton"],
    platformLayers: ["Edge Hardware", "AtomicOS", "ASNN SDK", "Atomic Center"],
    image: "/assets/industries/construction.png",
    seoTitle: "Construction Edge AI | Atomo",
    seoDescription:
      "Deploy edge AI for construction sites with safety monitoring, access intelligence and project visibility.",
  },
  {
    slug: "critical-infrastructure",
    name: "Critical Infrastructure",
    headline: "Resilient Intelligence for Essential Systems.",
    challenge:
      "Critical infrastructure must continue operating and making decisions even when cloud connectivity is degraded or unavailable.",
    cloudLimitation:
      "Dependence on remote processing creates single points of failure for systems that cannot tolerate delayed or interrupted intelligence.",
    capabilities: [
      "Continuous local operation",
      "Multi-camera event-driven intelligence",
      "Perimeter and safety monitoring",
      "Privacy-preserving on-premise processing",
    ],
    useCases: [
      "Perimeter monitoring",
      "Multi-camera intelligence",
      "Event-driven alerts",
      "Remote operations support",
      "Safety event detection",
    ],
    outcomes: [
      "Operational resilience during outages",
      "Sensitive data remains on-premise",
      "Faster event response",
    ],
    products: ["electron"],
    platformLayers: ["Edge Hardware", "AtomicOS", "ASNN SDK", "Atomic Center"],
    image: "/assets/industries/critical-infrastructure.png",
    seoTitle: "Critical Infrastructure Edge AI | Atomo",
    seoDescription:
      "Build resilient edge AI for critical infrastructure with local processing, event alerts and privacy by architecture.",
  },
  {
    slug: "transportation",
    name: "Transportation",
    headline: "Intelligence Across Moving Systems.",
    challenge:
      "Transportation networks require real-time analysis of vehicles, infrastructure and passenger environments across distributed locations.",
    cloudLimitation:
      "Uploading continuous video from transit hubs and fleet environments creates latency and bandwidth costs that impede timely decisions.",
    capabilities: [
      "Vehicle and fleet monitoring",
      "Traffic and infrastructure analysis",
      "Access control and event detection",
      "Edge processing at transit nodes",
    ],
    useCases: [
      "Fleet monitoring",
      "Traffic analysis",
      "Infrastructure monitoring",
      "Passenger safety",
      "Access control",
    ],
    outcomes: [
      "Timely detection of transport events",
      "Reduced cloud bandwidth requirements",
      "Distributed intelligence across nodes",
    ],
    products: ["electron", "proton"],
    platformLayers: ["Edge Hardware", "AtomicOS", "ASNN SDK"],
    image: "/assets/industries/transportation.png",
    seoTitle: "Transportation Edge AI | Atomo",
    seoDescription:
      "Power transportation intelligence with edge AI for fleet monitoring, traffic analysis and infrastructure visibility.",
  },
  {
    slug: "utilities",
    name: "Utilities",
    headline: "Edge Intelligence for Essential Services.",
    challenge:
      "Utility operators need continuous asset monitoring and operational alerts across remote and distributed infrastructure.",
    cloudLimitation:
      "Remote sites with limited bandwidth cannot efficiently stream all sensor and visual data to centralized cloud systems.",
    capabilities: [
      "Asset and grid monitoring",
      "Remote operations support",
      "Equipment intelligence at the edge",
      "Event-driven operational alerts",
    ],
    useCases: [
      "Grid monitoring",
      "Asset monitoring",
      "Remote operations",
      "Equipment intelligence",
      "Operational alerts",
    ],
    outcomes: [
      "Earlier detection of equipment anomalies",
      "Reduced data transmission costs",
      "Continued operation in low-bandwidth areas",
    ],
    products: ["electron"],
    platformLayers: ["Edge Hardware", "AtomicOS", "ASNN SDK", "Atomic Center"],
    image: "/assets/industries/utilities.png",
    seoTitle: "Utilities Edge AI | Atomo",
    seoDescription:
      "Monitor utility assets and operations with edge AI designed for remote, bandwidth-constrained environments.",
  },
  {
    slug: "defence-aerospace",
    name: "Defence & Aerospace",
    headline: "Secure Edge Intelligence for Demanding Environments.",
    challenge:
      "Defence and aerospace applications require local AI processing in disconnected, low-bandwidth and security-sensitive environments.",
    cloudLimitation:
      "Cloud-dependent architectures are unsuitable for operations that require autonomy, data sovereignty and intermittent connectivity.",
    capabilities: [
      "Local AI processing without continuous connectivity",
      "Event-driven communication",
      "Edge autonomy for disconnected operation",
      "Secure deployment architecture",
    ],
    useCases: [
      "Disconnected operation",
      "Low-bandwidth environments",
      "Event-driven intelligence",
      "Secure edge deployment",
    ],
    outcomes: [
      "Intelligence where connectivity is limited",
      "Reduced data exposure",
      "Autonomous edge decision-making",
    ],
    products: ["electron"],
    platformLayers: ["Edge Hardware", "AtomicOS", "ASNN SDK"],
    image: "/assets/industries/defence.png",
    seoTitle: "Defence & Aerospace Edge AI | Atomo",
    seoDescription:
      "Explore edge AI infrastructure for defence and aerospace with local processing and disconnected operation capabilities.",
  },
];

function getSolution(slug) {
  return solutions.find((s) => s.slug === slug);
}

module.exports = { solutions, getSolution };
