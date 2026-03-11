import { Video, MapPin, AlertTriangle, Clock } from "lucide-react";

interface CameraFeedProps {
  name: string;
  location: string;
  detectionType: string;
  lastAlert?: string;
  status: "online" | "offline";
}

const CameraFeed = ({ name, location, detectionType, lastAlert, status }: CameraFeedProps) => {
  return (
    <div className="glass-panel-hover overflow-hidden group">
      <div className="relative aspect-video bg-secondary/50 flex items-center justify-center">
        <div className="absolute inset-0 scan-line opacity-30" />
        <Video className="h-8 w-8 text-muted-foreground/40" />
        <div className={`absolute top-2 right-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
          status === "online" ? "bg-neon-green/20 text-neon-green" : "bg-neon-red/20 text-neon-red"
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${status === "online" ? "bg-neon-green alert-pulse" : "bg-neon-red"}`} />
          {status}
        </div>
      </div>
      <div className="p-3 space-y-1.5">
        <p className="text-sm font-semibold truncate">{name}</p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span className="truncate">{location}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-primary">
          <AlertTriangle className="h-3 w-3" />
          <span>{detectionType}</span>
        </div>
        {lastAlert && (
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{lastAlert}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraFeed;
