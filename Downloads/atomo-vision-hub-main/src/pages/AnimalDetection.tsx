import { Bug, Shield, TrendingDown, MapPin } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import AlertItem from "@/components/dashboard/AlertItem";
import { animalDetections } from "@/lib/mockData";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";

const timeline = [
  { time: "06:00", detections: 1 }, { time: "08:00", detections: 3 }, { time: "10:00", detections: 5 },
  { time: "12:00", detections: 2 }, { time: "14:00", detections: 4 }, { time: "16:00", detections: 6 },
  { time: "18:00", detections: 2 },
];

const recentAnimalAlerts = [
  { type: "animal" as const, title: "Rodent detected near grain storage", camera: "CAM-004", location: "Building C", timestamp: "15 min ago", confidence: 87 },
  { type: "animal" as const, title: "Bird intrusion in packaging", camera: "CAM-006", location: "Floor 2", timestamp: "1 hr ago", confidence: 92 },
  { type: "animal" as const, title: "Cat spotted in cold storage", camera: "CAM-007", location: "Building D", timestamp: "2 hrs ago", confidence: 78 },
  { type: "animal" as const, title: "Rodent near loading dock", camera: "CAM-003", location: "Dock B", timestamp: "4 hrs ago", confidence: 85, resolved: true },
];

const AnimalDetection = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Animal Detection</h1>
      <p className="text-sm text-muted-foreground">Pest & animal intrusion monitoring</p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <StatCard title="Total Detections" value={23} change="Today" icon={Bug} iconColor="text-neon-orange" />
      <StatCard title="Contamination Risk" value="Low" change="No critical zones" changeType="positive" icon={Shield} iconColor="text-neon-green" />
      <StatCard title="Wastage Prevented" value="₹42K" change="This month est." changeType="positive" icon={TrendingDown} iconColor="text-primary" />
      <StatCard title="Affected Areas" value={4} change="Out of 12 zones" icon={MapPin} iconColor="text-neon-yellow" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="glass-panel p-4">
        <h3 className="text-sm font-semibold mb-3">Detection by Animal Type</h3>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={animalDetections} cx="50%" cy="50%" outerRadius={85} dataKey="count" nameKey="type" paddingAngle={3}>
              {animalDetections.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Pie>
            <Tooltip contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 14% 22%)", borderRadius: "8px", fontSize: "12px" }} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          {animalDetections.map((d) => (
            <div key={d.type} className="flex items-center gap-1.5 text-xs">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
              {d.type}: {d.count}
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel p-4">
        <h3 className="text-sm font-semibold mb-3">Activity Timeline</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={timeline}>
            <defs>
              <linearGradient id="animalGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(25 95% 55%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(25 95% 55%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 18%)" />
            <XAxis dataKey="time" tick={{ fontSize: 10, fill: "hsl(215 15% 55%)" }} />
            <YAxis tick={{ fontSize: 10, fill: "hsl(215 15% 55%)" }} />
            <Tooltip contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 14% 22%)", borderRadius: "8px", fontSize: "12px" }} />
            <Area type="monotone" dataKey="detections" stroke="hsl(25 95% 55%)" fill="url(#animalGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="glass-panel p-4">
      <h3 className="text-sm font-semibold mb-3">Recent Animal Alerts</h3>
      <div className="space-y-2">
        {recentAnimalAlerts.map((alert, i) => <AlertItem key={i} {...alert} />)}
      </div>
    </div>
  </div>
);

export default AnimalDetection;
