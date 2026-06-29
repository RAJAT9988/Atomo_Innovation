const approved = (value, source) => ({
  value,
  source: source || "atomo.in",
  verificationStatus: "approved",
});

const draft = (value) => ({
  value,
  verificationStatus: "draft",
});

const electron = {
  slug: "electron",
  name: "Electron",
  headline: "Industrial Intelligence, Where Operations Happen.",
  supportingCopy:
    "Electron is an industrial edge computing platform designed to run AI, connect equipment and enable real-time decisions close to machines, cameras and sensors.",
  positioning:
    "Purpose-built for demanding industrial environments requiring high-performance edge AI, multi-protocol connectivity and reliable 24/7 operation.",
  environments: [
    "Manufacturing floors",
    "Critical infrastructure sites",
    "Construction and project sites",
    "Transportation hubs",
    "Smart city deployments",
  ],
  outcomes: [
    "Process video and sensor data locally without cloud dependency",
    "Integrate with industrial equipment through standard I/O interfaces",
    "Run multiple AI models for vision, safety and quality workloads",
    "Reduce latency for time-sensitive operational decisions",
  ],
  capabilities: [
    approved("2.4 GHz hex-core CPU optimized for multitasking and demanding workloads"),
    approved("5 TOPS NPU for efficient on-premise AI inference"),
    approved("GPIO, UART, I2C, SPI, USB and RS-485 for equipment integration"),
    approved("Industrial-hardened design for dust, vibration and temperature extremes"),
    approved("AtomicOS optimized for edge AI execution"),
    approved("Cloud integration via MQTT, HTTP and custom protocols"),
  ],
  specs: [
    { label: "CPU", value: approved("2.4 GHz hex-core") },
    { label: "NPU", value: approved("5 TOPS") },
    { label: "RAM", value: approved("16GB DDR4") },
    { label: "Storage", value: approved("128GB / 256GB eMMC") },
    { label: "Power", value: approved("5V 3A, Type-C") },
    { label: "Ethernet", value: approved("1 Gbps") },
    { label: "Wi-Fi", value: approved("802.11ac RSDB") },
    { label: "Bluetooth", value: approved("v5.0") },
    { label: "Thread", value: approved("Compatible") },
  ],
  connectivity: [
    approved("802.11ac RSDB Wi-Fi"),
    approved("Bluetooth v5.0"),
    approved("1 Gbps Ethernet"),
    approved("Thread compatible"),
  ],
  interfaces: [
    approved("GPIO"),
    approved("UART"),
    approved("I2C"),
    approved("SPI"),
    approved("USB"),
    approved("RS-485"),
  ],
  aiCapabilities: [
    approved("5 TOPS on-device inference"),
    approved("Multi-model AI processing"),
    approved("Computer vision workloads"),
    approved("Real-time event detection"),
  ],
  platformCompatibility: [
    approved("AtomicOS"),
    approved("ASNN SDK"),
    draft("Atomic Center"),
  ],
  useCases: [
    "Machine vision and quality inspection",
    "Worker safety monitoring",
    "Equipment and sensor integration",
    "Multi-camera intelligence",
    "Predictive maintenance analytics",
  ],
  heroImage: "/assets/products/electron/electron-hero.png",
  gallery: [
    "/assets/products/electron/electron-hero.png",
  ],
  seoTitle: "Electron | Industrial Edge AI Computer | Atomo",
  seoDescription:
    "Electron is Atomo's industrial edge computing platform with 5 TOPS NPU, hex-core CPU and industrial I/O for real-time AI at the edge.",
};

const proton = {
  slug: "proton",
  name: "Proton",
  headline: "Intelligent Edge Hub for Connected Environments.",
  supportingCopy:
    "Proton combines edge AI, multi-protocol connectivity and local automation to unify cameras, sensors and systems in commercial and smart infrastructure deployments.",
  positioning:
    "An edge hub for environments that require local intelligence, protocol bridging and centralized control without relying on continuous cloud connectivity.",
  environments: [
    "Commercial buildings",
    "Smart infrastructure",
    "Mixed industrial-commercial sites",
    "Edge aggregation points",
  ],
  outcomes: [
    "Bridge devices across multiple protocols into one edge platform",
    "Run automations locally for faster response and stronger privacy",
    "Deploy AI workloads with built-in NPU acceleration",
    "Scale as part of the broader Atomo ecosystem",
  ],
  capabilities: [
    approved("AtomoLink, Thread, Zigbee, WiFi, BLE, RF and IR connectivity"),
    approved("1.2 TOPS NPU for local AI workloads"),
    approved("Local automation and private computation"),
    approved("Over-the-air firmware updates"),
    approved("Developer API and SDK access"),
    approved("Energy monitoring and optimization"),
  ],
  specs: [
    { label: "CPU", value: approved("2.0 GHz quad-core") },
    { label: "NPU", value: approved("1.2 TOPS") },
    { label: "RAM", value: approved("4GB DDR4") },
    { label: "Storage", value: approved("64GB / 128GB eMMC") },
    { label: "Power", value: approved("5V 3A, Type-C") },
    { label: "Ethernet", value: approved("1 Gbps") },
    { label: "Wi-Fi", value: approved("802.11ac RSDB") },
    { label: "Bluetooth", value: approved("v5.0") },
    { label: "Thread", value: approved("Compatible") },
  ],
  connectivity: [
    approved("AtomoLink"),
    approved("Thread"),
    approved("Zigbee"),
    approved("Wi-Fi"),
    approved("BLE"),
    approved("RF and IR"),
  ],
  interfaces: [
    approved("1 Gbps Ethernet"),
    approved("USB Type-C power and data"),
  ],
  aiCapabilities: [
    approved("1.2 TOPS on-device inference"),
    approved("Habit-learning automation engine"),
    approved("Local event processing"),
  ],
  platformCompatibility: [
    approved("AtomicOS"),
    approved("ASNN SDK"),
    draft("Atomic Center"),
  ],
  useCases: [
    "Protocol bridging and device aggregation",
    "Building and facility automation",
    "Local camera and sensor intelligence",
    "Energy optimization",
    "Edge hub for distributed deployments",
  ],
  heroImage: "/assets/products/proton/proton-hero.png",
  gallery: ["/assets/products/proton/proton-hero.png"],
  seoTitle: "Proton | Edge AI Hub | Atomo",
  seoDescription:
    "Proton is Atomo's intelligent edge hub with multi-protocol connectivity, local AI and automation for connected infrastructure.",
};

const neutron = {
  slug: "neutron",
  name: "Neutron",
  headline: "Accessible Edge Control for Distributed Deployments.",
  supportingCopy:
    "Neutron provides reliable edge control and automation for entry-level deployments, functioning independently or as part of a larger Atomo ecosystem.",
  positioning:
    "Designed for cost-effective edge deployments that need dependable local control, simple onboarding and compatibility with Proton and Electron at scale.",
  environments: [
    "Entry-level edge deployments",
    "Retrofit installations",
    "Distributed sensor networks",
    "Remote monitoring sites",
  ],
  outcomes: [
    "Deploy edge control without deep technical expertise",
    "Run automations locally with optional cloud sync",
    "Scale into Proton or Electron as requirements grow",
    "Reduce bandwidth dependency for basic intelligence workloads",
  ],
  capabilities: [
    approved("WiFi, BLE, IR and RF device support"),
    approved("App-based control and onboarding"),
    approved("Schedule and rule-based automation"),
    approved("Local execution with cloud backup sync"),
    approved("Compatible with Proton and Electron ecosystem"),
    approved("Modular expansion for additional controls"),
  ],
  specs: [
    { label: "CPU", value: approved("1.2 GHz quad-core Cortex-A7") },
    { label: "NPU", value: approved("Not compatible") },
    { label: "RAM", value: approved("2GB DDR4") },
    { label: "Storage", value: approved("64GB eMMC") },
    { label: "Power", value: approved("5V 2A, Type-C") },
    { label: "Ethernet", value: approved("10/100 Mbps RJ45") },
    { label: "Wi-Fi", value: approved("802.11 b/g/n") },
    { label: "Bluetooth", value: approved("Not compatible") },
    { label: "Thread", value: approved("Not compatible") },
  ],
  connectivity: [
    approved("Wi-Fi 802.11 b/g/n"),
    approved("BLE"),
    approved("IR and RF"),
  ],
  interfaces: [
    approved("10/100 Mbps Ethernet"),
    approved("USB Type-C"),
  ],
  aiCapabilities: [
    approved("Rule-based automation engine"),
    approved("Basic sensor event processing"),
  ],
  platformCompatibility: [
    approved("AtomicOS"),
    draft("ASNN SDK — limited"),
    draft("Atomic Center"),
  ],
  useCases: [
    "Basic automation and scheduling",
    "Remote site monitoring",
    "Device pairing and control",
    "Entry-level edge deployments",
    "Ecosystem expansion nodes",
  ],
  heroImage: "/assets/products/neutron/neutron-hero.svg",
  gallery: ["/assets/products/neutron/neutron-hero.svg"],
  seoTitle: "Neutron | Edge Control Device | Atomo",
  seoDescription:
    "Neutron is Atomo's accessible edge control device for reliable local automation and scalable ecosystem deployments.",
};

const products = { electron, proton, neutron };

function getProduct(slug) {
  return products[slug];
}

const productList = [electron, proton, neutron];

module.exports = { electron, proton, neutron, products, getProduct, productList };
