import { Package, ArrowDownToLine, ArrowUpFromLine, AlertTriangle } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import { inventoryData } from "@/lib/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const Inventory = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Sack / Box Counter</h1>
      <p className="text-sm text-muted-foreground">AI-powered automated inventory counting</p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <StatCard title="Current Stock" value="8,942" icon={Package} iconColor="text-neon-purple" />
      <StatCard title="Incoming Today" value={534} change="+12% vs avg" changeType="positive" icon={ArrowDownToLine} iconColor="text-neon-green" />
      <StatCard title="Dispatched Today" value={447} change="On track" changeType="positive" icon={ArrowUpFromLine} iconColor="text-neon-blue" />
      <StatCard title="Discrepancies" value={3} change="Needs review" changeType="negative" icon={AlertTriangle} iconColor="text-neon-red" />
    </div>

    <div className="glass-panel p-4">
      <h3 className="text-sm font-semibold mb-3">Hourly Inventory Movement</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={inventoryData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 18%)" />
          <XAxis dataKey="hour" tick={{ fontSize: 10, fill: "hsl(215 15% 55%)" }} />
          <YAxis tick={{ fontSize: 10, fill: "hsl(215 15% 55%)" }} />
          <Tooltip contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 14% 22%)", borderRadius: "8px", fontSize: "12px" }} />
          <Legend wrapperStyle={{ fontSize: "11px" }} />
          <Bar dataKey="incoming" fill="hsl(170 80% 50%)" radius={[4, 4, 0, 0]} name="Incoming" />
          <Bar dataKey="outgoing" fill="hsl(260 70% 60%)" radius={[4, 4, 0, 0]} name="Outgoing" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default Inventory;
