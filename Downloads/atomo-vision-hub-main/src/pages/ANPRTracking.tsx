import { Truck, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import { truckLog } from "@/lib/mockData";

const statusColors: Record<string, string> = {
  "Completed": "bg-neon-green/15 text-neon-green",
  "On Time": "bg-neon-blue/15 text-neon-blue",
  "Delayed": "bg-neon-red/15 text-neon-red",
};

const ANPRTracking = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">ANPR Truck Tracking</h1>
      <p className="text-sm text-muted-foreground">Automatic Number Plate Recognition & dispatch monitoring</p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <StatCard title="Trucks Today" value={67} icon={Truck} iconColor="text-neon-blue" />
      <StatCard title="In Progress" value={12} icon={Clock} iconColor="text-neon-yellow" />
      <StatCard title="Completed" value={52} icon={CheckCircle} iconColor="text-neon-green" />
      <StatCard title="Unauthorized" value={3} change="Flagged" changeType="negative" icon={AlertTriangle} iconColor="text-neon-red" />
    </div>

    <div className="glass-panel overflow-hidden">
      <div className="p-4 border-b border-border/50">
        <h3 className="text-sm font-semibold">Vehicle Log</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/30 text-xs text-muted-foreground uppercase tracking-wider">
              <th className="px-4 py-3 text-left">Plate Number</th>
              <th className="px-4 py-3 text-left">Company</th>
              <th className="px-4 py-3 text-left">Entry Time</th>
              <th className="px-4 py-3 text-left">Exit Time</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {truckLog.map((t, i) => (
              <tr key={i} className="border-b border-border/20 hover:bg-secondary/30 transition-colors">
                <td className="px-4 py-3 font-mono font-semibold text-primary">{t.plate}</td>
                <td className="px-4 py-3">{t.company}</td>
                <td className="px-4 py-3 text-muted-foreground">{t.entry}</td>
                <td className="px-4 py-3 text-muted-foreground">{t.exit}</td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${statusColors[t.status]}`}>{t.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default ANPRTracking;
