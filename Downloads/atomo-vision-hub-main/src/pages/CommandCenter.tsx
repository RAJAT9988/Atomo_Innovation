import { Camera, CameraOff, AlertTriangle, Users, Bug, Truck, Package, Cpu, Activity } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import CameraFeed from "@/components/dashboard/CameraFeed";
import AlertItem from "@/components/dashboard/AlertItem";
import { alertsPerHour, detectionStats, deviceMetrics, cameras, recentAlerts } from "@/lib/mockData";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const ChartTooltipStyle = {
  contentStyle: { background: "hsl(220 18% 10%)", border: "1px solid hsl(220 14% 22%)", borderRadius: "8px", fontSize: "12px" },
  labelStyle: { color: "hsl(210 20% 92%)" },
};

const CommandCenter = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Command Center</h1>
        <p className="text-sm text-muted-foreground">Real-time AI surveillance overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard title="Cameras Active" value={42} change="+2 today" changeType="positive" icon={Camera} iconColor="text-neon-green" />
        <StatCard title="Cameras Offline" value={3} change="-1 from yesterday" changeType="positive" icon={CameraOff} iconColor="text-neon-red" />
        <StatCard title="Total Alerts" value={127} change="+18% vs yesterday" changeType="negative" icon={AlertTriangle} iconColor="text-neon-orange" />
        <StatCard title="Unauthorized" value={13} change="6 unresolved" changeType="negative" icon={Users} iconColor="text-neon-red" />
        <StatCard title="Animal Intrusions" value={23} change="+5 today" changeType="negative" icon={Bug} iconColor="text-neon-orange" />
        <StatCard title="Trucks Today" value={67} change="12 in progress" changeType="neutral" icon={Truck} iconColor="text-neon-blue" />
        <StatCard title="Inventory Count" value="8,942" change="+234 incoming" changeType="positive" icon={Package} iconColor="text-neon-purple" />
        <StatCard title="Device Health" value="96%" change="All NPUs nominal" changeType="positive" icon={Cpu} iconColor="text-neon-cyan" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-panel p-4">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />Alerts Per Hour
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={alertsPerHour}>
              <defs>
                <linearGradient id="alertGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(170 80% 50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(170 80% 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 18%)" />
              <XAxis dataKey="hour" tick={{ fontSize: 10, fill: "hsl(215 15% 55%)" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(215 15% 55%)" }} tickLine={false} axisLine={false} />
              <Tooltip {...ChartTooltipStyle} />
              <Area type="monotone" dataKey="alerts" stroke="hsl(170 80% 50%)" fill="url(#alertGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-panel p-4">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Cpu className="h-4 w-4 text-neon-purple" />Device Performance
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={deviceMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 18%)" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: "hsl(215 15% 55%)" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(215 15% 55%)" }} tickLine={false} axisLine={false} />
              <Tooltip {...ChartTooltipStyle} />
              <Line type="monotone" dataKey="cpu" stroke="hsl(210 90% 60%)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="npu" stroke="hsl(170 80% 50%)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="temp" stroke="hsl(0 72% 55%)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-panel p-4">
          <h3 className="text-sm font-semibold mb-3">Detection Statistics</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={detectionStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 18%)" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(215 15% 55%)" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(215 15% 55%)" }} tickLine={false} axisLine={false} />
              <Tooltip {...ChartTooltipStyle} />
              <Bar dataKey="authorized" fill="hsl(170 80% 50%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="unauthorized" fill="hsl(0 72% 55%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-panel p-4">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-neon-orange" />Recent Alerts
          </h3>
          <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
            {recentAlerts.map((alert, i) => (
              <AlertItem key={i} {...alert} />
            ))}
          </div>
        </div>
      </div>

      {/* Camera Grid */}
      <div>
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Camera className="h-4 w-4 text-primary" />Live Camera Feeds
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {cameras.map((cam) => (
            <CameraFeed key={cam.id} {...cam} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommandCenter;
