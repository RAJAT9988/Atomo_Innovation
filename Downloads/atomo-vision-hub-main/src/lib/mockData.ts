export const alertsPerHour = [
  { hour: "00:00", alerts: 2 }, { hour: "01:00", alerts: 1 }, { hour: "02:00", alerts: 3 },
  { hour: "03:00", alerts: 0 }, { hour: "04:00", alerts: 1 }, { hour: "05:00", alerts: 4 },
  { hour: "06:00", alerts: 8 }, { hour: "07:00", alerts: 12 }, { hour: "08:00", alerts: 15 },
  { hour: "09:00", alerts: 18 }, { hour: "10:00", alerts: 22 }, { hour: "11:00", alerts: 19 },
  { hour: "12:00", alerts: 14 }, { hour: "13:00", alerts: 16 }, { hour: "14:00", alerts: 20 },
  { hour: "15:00", alerts: 17 }, { hour: "16:00", alerts: 13 }, { hour: "17:00", alerts: 9 },
  { hour: "18:00", alerts: 6 }, { hour: "19:00", alerts: 4 }, { hour: "20:00", alerts: 3 },
  { hour: "21:00", alerts: 2 }, { hour: "22:00", alerts: 1 }, { hour: "23:00", alerts: 1 },
];

export const detectionStats = [
  { name: "Person", detected: 145, authorized: 132, unauthorized: 13 },
  { name: "Animal", detected: 23, authorized: 0, unauthorized: 23 },
  { name: "Vehicle", detected: 67, authorized: 61, unauthorized: 6 },
  { name: "Package", detected: 892, authorized: 892, unauthorized: 0 },
];

export const deviceMetrics = [
  { time: "06:00", cpu: 45, ram: 62, npu: 78, temp: 52 },
  { time: "08:00", cpu: 58, ram: 68, npu: 85, temp: 56 },
  { time: "10:00", cpu: 72, ram: 74, npu: 92, temp: 61 },
  { time: "12:00", cpu: 65, ram: 71, npu: 88, temp: 58 },
  { time: "14:00", cpu: 78, ram: 76, npu: 95, temp: 64 },
  { time: "16:00", cpu: 62, ram: 69, npu: 82, temp: 55 },
  { time: "18:00", cpu: 48, ram: 63, npu: 70, temp: 50 },
];

export const cameras = [
  { id: "CAM-001", name: "Main Gate Entry", location: "Gate A", detectionType: "Person + ANPR", status: "online" as const, lastAlert: "2 min ago", ip: "192.168.1.101" },
  { id: "CAM-002", name: "Warehouse Bay 1", location: "Warehouse A", detectionType: "Sack Counter", status: "online" as const, lastAlert: "15 min ago", ip: "192.168.1.102" },
  { id: "CAM-003", name: "Loading Dock", location: "Dock B", detectionType: "ANPR + Person", status: "online" as const, lastAlert: "8 min ago", ip: "192.168.1.103" },
  { id: "CAM-004", name: "Storage Room 3", location: "Building C", detectionType: "Animal Detection", status: "online" as const, lastAlert: "1 hr ago", ip: "192.168.1.104" },
  { id: "CAM-005", name: "Perimeter East", location: "Fence Line", detectionType: "Person Detection", status: "offline" as const, lastAlert: "3 hrs ago", ip: "192.168.1.105" },
  { id: "CAM-006", name: "Packaging Area", location: "Floor 2", detectionType: "Sack Counter", status: "online" as const, lastAlert: "30 min ago", ip: "192.168.1.106" },
  { id: "CAM-007", name: "Cold Storage", location: "Building D", detectionType: "Animal + Person", status: "online" as const, lastAlert: "45 min ago", ip: "192.168.1.107" },
  { id: "CAM-008", name: "Exit Gate", location: "Gate B", detectionType: "ANPR", status: "online" as const, lastAlert: "5 min ago", ip: "192.168.1.108" },
];

export const recentAlerts = [
  { type: "person" as const, title: "Unauthorized person detected", camera: "CAM-001", location: "Gate A", timestamp: "2 min ago", confidence: 94 },
  { type: "animal" as const, title: "Rodent detected in storage", camera: "CAM-004", location: "Building C", timestamp: "15 min ago", confidence: 87 },
  { type: "truck" as const, title: "Unregistered vehicle at dock", camera: "CAM-003", location: "Dock B", timestamp: "28 min ago", confidence: 91 },
  { type: "camera" as const, title: "Camera feed frozen", camera: "CAM-005", location: "Fence Line", timestamp: "1 hr ago" },
  { type: "device" as const, title: "NPU temperature critical", camera: "Device-03", location: "Server Room", timestamp: "2 hrs ago" },
  { type: "person" as const, title: "Unknown person in restricted zone", camera: "CAM-007", location: "Building D", timestamp: "3 hrs ago", confidence: 82, resolved: true },
];

export const truckLog = [
  { plate: "MH 12 AB 1234", company: "FastFreight Logistics", entry: "08:15 AM", exit: "10:30 AM", status: "Completed" },
  { plate: "KA 01 CD 5678", company: "Cargo Express", entry: "09:45 AM", exit: "—", status: "On Time" },
  { plate: "DL 02 EF 9012", company: "Prime Movers", entry: "11:00 AM", exit: "—", status: "Delayed" },
  { plate: "TN 07 GH 3456", company: "Swift Transport", entry: "07:30 AM", exit: "09:15 AM", status: "Completed" },
  { plate: "GJ 05 IJ 7890", company: "National Carriers", entry: "10:20 AM", exit: "—", status: "On Time" },
];

export const inventoryData = [
  { hour: "06:00", incoming: 45, outgoing: 12 },
  { hour: "08:00", incoming: 120, outgoing: 35 },
  { hour: "10:00", incoming: 89, outgoing: 67 },
  { hour: "12:00", incoming: 56, outgoing: 98 },
  { hour: "14:00", incoming: 134, outgoing: 45 },
  { hour: "16:00", incoming: 67, outgoing: 112 },
  { hour: "18:00", incoming: 23, outgoing: 78 },
];

export const animalDetections = [
  { type: "Rodent", count: 12, color: "hsl(var(--neon-orange))" },
  { type: "Bird", count: 6, color: "hsl(var(--neon-blue))" },
  { type: "Cat", count: 3, color: "hsl(var(--neon-purple))" },
  { type: "Dog", count: 2, color: "hsl(var(--neon-yellow))" },
];

export const edgeDevices = [
  { id: "DEV-001", name: "Electron NPU Alpha", model: "NPU-X100", serial: "ATM-2024-001", uptime: "45d 12h", firmware: "v3.2.1", cpu: 62, ram: 71, npu: 85, temp: 56, storage: 45, network: 92 },
  { id: "DEV-002", name: "Electron NPU Beta", model: "NPU-X100", serial: "ATM-2024-002", uptime: "38d 7h", firmware: "v3.2.1", cpu: 48, ram: 65, npu: 72, temp: 51, storage: 38, network: 95 },
  { id: "DEV-003", name: "Electron NPU Gamma", model: "NPU-X200", serial: "ATM-2024-003", uptime: "12d 3h", firmware: "v3.3.0", cpu: 78, ram: 82, npu: 95, temp: 67, storage: 62, network: 88 },
  { id: "DEV-004", name: "Electron NPU Delta", model: "NPU-X100", serial: "ATM-2024-004", uptime: "52d 18h", firmware: "v3.2.0", cpu: 35, ram: 55, npu: 60, temp: 48, storage: 28, network: 97 },
];

export const aiModels = [
  { id: "MDL-001", name: "PersonNet v4", type: "Person Detection", accuracy: 96.8, falsePositive: 2.1, inferenceTime: 12, version: "4.2.1", status: "active" },
  { id: "MDL-002", name: "PestGuard v2", type: "Animal Detection", accuracy: 93.5, falsePositive: 4.3, inferenceTime: 8, version: "2.1.0", status: "active" },
  { id: "MDL-003", name: "CounterAI v3", type: "Sack Counter", accuracy: 98.2, falsePositive: 0.8, inferenceTime: 15, version: "3.0.2", status: "active" },
  { id: "MDL-004", name: "PlateReader v5", type: "ANPR Detection", accuracy: 97.1, falsePositive: 1.5, inferenceTime: 10, version: "5.0.0", status: "active" },
  { id: "MDL-005", name: "FaceMatch v2", type: "Facial Recognition", accuracy: 94.7, falsePositive: 3.2, inferenceTime: 18, version: "2.3.1", status: "disabled" },
];

export const personDetectionLog = [
  { id: 1, name: "Rajesh Kumar", status: "authorized", confidence: 98.2, camera: "CAM-001", time: "09:15 AM", department: "Operations" },
  { id: 2, name: "Unknown", status: "unauthorized", confidence: 94.1, camera: "CAM-007", time: "09:32 AM", department: "—" },
  { id: 3, name: "Priya Sharma", status: "authorized", confidence: 97.8, camera: "CAM-001", time: "09:45 AM", department: "HR" },
  { id: 4, name: "Unknown", status: "unauthorized", confidence: 82.3, camera: "CAM-003", time: "10:12 AM", department: "—" },
  { id: 5, name: "Amit Patel", status: "authorized", confidence: 99.1, camera: "CAM-002", time: "10:30 AM", department: "Warehouse" },
  { id: 6, name: "Sunita Devi", status: "authorized", confidence: 96.5, camera: "CAM-006", time: "10:48 AM", department: "Packaging" },
];
