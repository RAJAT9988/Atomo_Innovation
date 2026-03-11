import { AlertTriangle, Camera, Clock, ShieldAlert, Bug, Truck } from "lucide-react";

export type AlertType = "person" | "animal" | "truck" | "camera" | "device";

interface AlertItemProps {
  type: AlertType;
  title: string;
  camera: string;
  location: string;
  timestamp: string;
  confidence?: number;
  resolved?: boolean;
}

const alertConfig: Record<AlertType, { icon: typeof AlertTriangle; color: string; label: string }> = {
  person: { icon: ShieldAlert, color: "text-neon-red", label: "Person" },
  animal: { icon: Bug, color: "text-neon-orange", label: "Animal" },
  truck: { icon: Truck, color: "text-neon-yellow", label: "Vehicle" },
  camera: { icon: Camera, color: "text-neon-blue", label: "Camera" },
  device: { icon: AlertTriangle, color: "text-neon-purple", label: "Device" },
};

const AlertItem = ({ type, title, camera, location, timestamp, confidence, resolved }: AlertItemProps) => {
  const config = alertConfig[type];
  const Icon = config.icon;

  return (
    <div className={`glass-panel p-3 flex items-start gap-3 ${resolved ? "opacity-50" : ""}`}>
      <div className={`p-2 rounded-lg bg-secondary ${config.color}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0 space-y-0.5">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${config.color} bg-secondary`}>
            {config.label}
          </span>
          {resolved && <span className="text-[10px] text-neon-green font-medium">Resolved</span>}
        </div>
        <p className="text-sm font-medium truncate">{title}</p>
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1"><Camera className="h-3 w-3" />{camera}</span>
          <span>{location}</span>
          {confidence && <span className="text-primary">{confidence}%</span>}
        </div>
      </div>
      <div className="flex items-center gap-1 text-[10px] text-muted-foreground whitespace-nowrap">
        <Clock className="h-3 w-3" />
        {timestamp}
      </div>
    </div>
  );
};

export default AlertItem;
