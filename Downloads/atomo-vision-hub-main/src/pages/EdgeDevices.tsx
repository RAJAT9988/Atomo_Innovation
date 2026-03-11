import { Cpu, Thermometer, HardDrive, Wifi } from "lucide-react";
import { edgeDevices, deviceMetrics } from "@/lib/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const MetricBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-[11px]">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono font-semibold" style={{ color }}>{value}%</span>
    </div>
    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, background: color }} />
    </div>
  </div>
);

const EdgeDevices = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Edge AI Devices</h1>
      <p className="text-sm text-muted-foreground">Electron NPU device performance monitoring</p>
    </div>

    <div className="glass-panel p-4">
      <h3 className="text-sm font-semibold mb-3">Performance Timeline</h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={deviceMetrics}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 18%)" />
          <XAxis dataKey="time" tick={{ fontSize: 10, fill: "hsl(215 15% 55%)" }} />
          <YAxis tick={{ fontSize: 10, fill: "hsl(215 15% 55%)" }} />
          <Tooltip contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 14% 22%)", borderRadius: "8px", fontSize: "12px" }} />
          <Line type="monotone" dataKey="cpu" stroke="hsl(210 90% 60%)" strokeWidth={2} dot={false} name="CPU" />
          <Line type="monotone" dataKey="ram" stroke="hsl(260 70% 60%)" strokeWidth={2} dot={false} name="RAM" />
          <Line type="monotone" dataKey="npu" stroke="hsl(170 80% 50%)" strokeWidth={2} dot={false} name="NPU" />
          <Line type="monotone" dataKey="temp" stroke="hsl(0 72% 55%)" strokeWidth={2} dot={false} name="Temp" />
        </LineChart>
      </ResponsiveContainer>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {edgeDevices.map((d) => (
        <div key={d.id} className="glass-panel-hover p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-semibold">{d.name}</p>
              <p className="text-[10px] text-muted-foreground">{d.model} • {d.serial}</p>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-neon-green font-mono">
              <Wifi className="h-3 w-3" /> Online
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-[10px] text-muted-foreground">
            <span>Uptime: {d.uptime}</span>
            <span>FW: {d.firmware}</span>
            <span className="flex items-center gap-1"><Thermometer className="h-3 w-3" />{d.temp}°C</span>
          </div>
          <div className="space-y-2">
            <MetricBar label="CPU" value={d.cpu} color="hsl(210 90% 60%)" />
            <MetricBar label="RAM" value={d.ram} color="hsl(260 70% 60%)" />
            <MetricBar label="NPU" value={d.npu} color="hsl(170 80% 50%)" />
            <MetricBar label="Storage" value={d.storage} color="hsl(45 95% 55%)" />
            <MetricBar label="Network" value={d.network} color="hsl(145 70% 50%)" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default EdgeDevices;
