import { BarChart3, FileText, Download } from "lucide-react";

const reports = [
  { name: "Daily Detection Summary", description: "All detection events for today", date: "March 11, 2026" },
  { name: "Weekly Security Report", description: "Unauthorized access & intrusions", date: "Mar 4-10, 2026" },
  { name: "Inventory Movement Report", description: "Sack/box count & dispatch data", date: "March 11, 2026" },
  { name: "Vehicle Dispatch Report", description: "ANPR tracking & compliance", date: "Mar 4-10, 2026" },
  { name: "Device Health Report", description: "Edge AI device performance metrics", date: "March 11, 2026" },
];

const Reports = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
      <p className="text-sm text-muted-foreground">Generate and export operational reports</p>
    </div>

    <div className="space-y-3">
      {reports.map((r, i) => (
        <div key={i} className="glass-panel-hover p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-secondary">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm">{r.name}</p>
              <p className="text-xs text-muted-foreground">{r.description} • {r.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-xs hover:bg-secondary/80 transition-colors">
              <Download className="h-3 w-3" /> PDF
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs hover:bg-primary/20 transition-colors">
              <Download className="h-3 w-3" /> Excel
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Reports;
