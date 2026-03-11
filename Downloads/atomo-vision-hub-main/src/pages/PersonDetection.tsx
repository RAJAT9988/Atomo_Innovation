import { Users, ShieldCheck, ShieldAlert, Eye, UserCheck, UserX } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import { personDetectionLog } from "@/lib/mockData";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const recognitionData = [
  { name: "Authorized", value: 132, color: "hsl(145 70% 50%)" },
  { name: "Unauthorized", value: 13, color: "hsl(0 72% 55%)" },
];

const topCameras = [
  { camera: "CAM-001", alerts: 5 },
  { camera: "CAM-007", alerts: 4 },
  { camera: "CAM-003", alerts: 2 },
  { camera: "CAM-005", alerts: 1 },
  { camera: "CAM-002", alerts: 1 },
];

const PersonDetection = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Person Detection</h1>
        <p className="text-sm text-muted-foreground">Real-time facial recognition & access monitoring</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard title="Total Detected" value={145} change="Today" icon={Users} iconColor="text-neon-blue" />
        <StatCard title="Authorized" value={132} change="91% match rate" changeType="positive" icon={ShieldCheck} iconColor="text-neon-green" />
        <StatCard title="Unauthorized" value={13} change="6 unresolved" changeType="negative" icon={ShieldAlert} iconColor="text-neon-red" />
        <StatCard title="Recognition Rate" value="96.8%" change="+0.3% vs last week" changeType="positive" icon={Eye} iconColor="text-primary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-panel p-4">
          <h3 className="text-sm font-semibold mb-3">Recognized vs Unrecognized</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={recognitionData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                {recognitionData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 14% 22%)", borderRadius: "8px", fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-2">
            {recognitionData.map((d) => (
              <div key={d.name} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                {d.name}: {d.value}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-4">
          <h3 className="text-sm font-semibold mb-3">Top Alert Cameras</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topCameras} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 18%)" />
              <XAxis type="number" tick={{ fontSize: 10, fill: "hsl(215 15% 55%)" }} />
              <YAxis dataKey="camera" type="category" tick={{ fontSize: 10, fill: "hsl(215 15% 55%)" }} width={70} />
              <Bar dataKey="alerts" fill="hsl(0 72% 55%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-panel overflow-hidden">
        <div className="p-4 border-b border-border/50">
          <h3 className="text-sm font-semibold">Detection Timeline</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30 text-xs text-muted-foreground uppercase tracking-wider">
                <th className="px-4 py-3 text-left">Person</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Confidence</th>
                <th className="px-4 py-3 text-left">Camera</th>
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-left">Department</th>
              </tr>
            </thead>
            <tbody>
              {personDetectionLog.map((p) => (
                <tr key={p.id} className="border-b border-border/20 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3 flex items-center gap-2">
                    {p.status === "authorized" ? <UserCheck className="h-4 w-4 text-neon-green" /> : <UserX className="h-4 w-4 text-neon-red" />}
                    <span className="font-medium">{p.name}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      p.status === "authorized" ? "bg-neon-green/15 text-neon-green" : "bg-neon-red/15 text-neon-red"
                    }`}>{p.status}</span>
                  </td>
                  <td className="px-4 py-3 font-mono text-primary">{p.confidence}%</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.camera}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.time}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PersonDetection;
