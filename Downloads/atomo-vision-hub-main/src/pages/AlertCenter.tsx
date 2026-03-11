import { AlertTriangle, Filter } from "lucide-react";
import AlertItem from "@/components/dashboard/AlertItem";
import { recentAlerts } from "@/lib/mockData";

const allAlerts = [
  ...recentAlerts,
  { type: "person" as const, title: "Suspicious activity near exit", camera: "CAM-008", location: "Gate B", timestamp: "4 hrs ago", confidence: 76 },
  { type: "animal" as const, title: "Bird nesting detected", camera: "CAM-006", location: "Floor 2", timestamp: "5 hrs ago", confidence: 89, resolved: true },
  { type: "truck" as const, title: "License plate mismatch", camera: "CAM-003", location: "Dock B", timestamp: "6 hrs ago", confidence: 95 },
  { type: "camera" as const, title: "Tampering detected on CAM-004", camera: "CAM-004", location: "Building C", timestamp: "7 hrs ago" },
  { type: "device" as const, title: "Low storage on Device-02", camera: "Device-02", location: "Server Room", timestamp: "8 hrs ago", resolved: true },
];

const AlertCenter = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Alert Center</h1>
        <p className="text-sm text-muted-foreground">{allAlerts.length} alerts • {allAlerts.filter(a => !a.resolved).length} unresolved</p>
      </div>
      <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-sm text-muted-foreground hover:text-foreground transition-colors">
        <Filter className="h-3.5 w-3.5" /> Filter
      </button>
    </div>

    <div className="space-y-2">
      {allAlerts.map((alert, i) => (
        <AlertItem key={i} {...alert} />
      ))}
    </div>
  </div>
);

export default AlertCenter;
