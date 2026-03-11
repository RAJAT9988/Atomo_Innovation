import { useState } from "react";
import { Brain, Zap, Target, Clock, Plus, Trash2, Power, PowerOff, Edit } from "lucide-react";
import { aiModels as initialModels } from "@/lib/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

type AIModel = typeof initialModels[0];

const AIModels = () => {
  const [models, setModels] = useState<AIModel[]>(initialModels);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingModel, setEditingModel] = useState<AIModel | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "", type: "Person Detection", accuracy: "95", falsePositive: "2", inferenceTime: "12", version: "1.0.0",
  });

  const resetForm = () => setForm({ name: "", type: "Person Detection", accuracy: "95", falsePositive: "2", inferenceTime: "12", version: "1.0.0" });

  const openAdd = () => { resetForm(); setEditingModel(null); setDialogOpen(true); };

  const openEdit = (m: AIModel) => {
    setEditingModel(m);
    setForm({ name: m.name, type: m.type, accuracy: String(m.accuracy), falsePositive: String(m.falsePositive), inferenceTime: String(m.inferenceTime), version: m.version });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) { toast({ title: "Name is required", variant: "destructive" }); return; }

    if (editingModel) {
      setModels(prev => prev.map(m => m.id === editingModel.id ? {
        ...m, name: form.name, type: form.type, accuracy: parseFloat(form.accuracy), falsePositive: parseFloat(form.falsePositive),
        inferenceTime: parseInt(form.inferenceTime), version: form.version,
      } : m));
      toast({ title: "Model updated", description: `${form.name} has been updated.` });
    } else {
      const newModel: AIModel = {
        id: `MDL-${String(models.length + 1).padStart(3, "0")}`,
        name: form.name, type: form.type, accuracy: parseFloat(form.accuracy), falsePositive: parseFloat(form.falsePositive),
        inferenceTime: parseInt(form.inferenceTime), version: form.version, status: "active",
      };
      setModels(prev => [...prev, newModel]);
      toast({ title: "Model added", description: `${form.name} has been deployed.` });
    }
    setDialogOpen(false);
  };

  const toggleStatus = (id: string) => {
    setModels(prev => prev.map(m => m.id === id ? { ...m, status: m.status === "active" ? "disabled" : "active" } : m));
  };

  const handleDelete = (id: string) => {
    const name = models.find(m => m.id === id)?.name;
    setModels(prev => prev.filter(m => m.id !== id));
    setDeleteConfirm(null);
    toast({ title: "Model removed", description: `${name} has been removed.` });
  };

  const activeModels = models.filter(m => m.status === "active");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Model Management</h1>
          <p className="text-sm text-muted-foreground">{models.length} models • {activeModels.length} active</p>
        </div>
        <Button onClick={openAdd} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Add Model
        </Button>
      </div>

      <div className="glass-panel p-4">
        <h3 className="text-sm font-semibold mb-3">Model Accuracy Comparison</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={activeModels}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 18%)" />
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(215 15% 55%)" }} />
            <YAxis domain={[85, 100]} tick={{ fontSize: 10, fill: "hsl(215 15% 55%)" }} />
            <Tooltip contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 14% 22%)", borderRadius: "8px", fontSize: "12px" }} />
            <Bar dataKey="accuracy" fill="hsl(170 80% 50%)" radius={[4, 4, 0, 0]} name="Accuracy %" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {models.map((m) => (
          <div key={m.id} className="glass-panel-hover p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-sm">{m.name}</p>
                  <p className="text-[10px] text-muted-foreground">{m.type}</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                m.status === "active" ? "bg-neon-green/15 text-neon-green" : "bg-secondary text-muted-foreground"
              }`}>{m.status}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-1.5 text-xs">
                <Target className="h-3.5 w-3.5 text-neon-green" />
                <span className="text-muted-foreground">Accuracy:</span>
                <span className="font-mono font-semibold">{m.accuracy}%</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <Zap className="h-3.5 w-3.5 text-neon-orange" />
                <span className="text-muted-foreground">FP Rate:</span>
                <span className="font-mono font-semibold">{m.falsePositive}%</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <Clock className="h-3.5 w-3.5 text-neon-blue" />
                <span className="text-muted-foreground">Inference:</span>
                <span className="font-mono font-semibold">{m.inferenceTime}ms</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Version: <span className="font-mono">{m.version}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1 border-t border-border/30">
              <button onClick={() => openEdit(m)} className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-secondary text-xs text-muted-foreground hover:text-foreground transition-colors">
                <Edit className="h-3 w-3" /> Edit
              </button>
              <button onClick={() => toggleStatus(m.id)} className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs transition-colors ${
                m.status === "active" ? "bg-neon-orange/10 text-neon-orange hover:bg-neon-orange/20" : "bg-neon-green/10 text-neon-green hover:bg-neon-green/20"
              }`}>
                {m.status === "active" ? <><PowerOff className="h-3 w-3" /> Disable</> : <><Power className="h-3 w-3" /> Enable</>}
              </button>
              <button onClick={() => setDeleteConfirm(m.id)} className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-destructive/10 text-destructive text-xs hover:bg-destructive/20 transition-colors ml-auto">
                <Trash2 className="h-3 w-3" /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-card border-glass-border">
          <DialogHeader>
            <DialogTitle>{editingModel ? "Edit Model" : "Add New Model"}</DialogTitle>
            <DialogDescription>{editingModel ? "Update model configuration" : "Deploy a new AI model to the system"}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Model Name</Label>
              <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. PersonNet v5" className="bg-secondary border-border" />
            </div>
            <div className="space-y-2">
              <Label>Detection Type</Label>
              <Select value={form.type} onValueChange={v => setForm(f => ({ ...f, type: v }))}>
                <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-card border-glass-border">
                  <SelectItem value="Person Detection">Person Detection</SelectItem>
                  <SelectItem value="Animal Detection">Animal Detection</SelectItem>
                  <SelectItem value="Sack Counter">Sack Counter</SelectItem>
                  <SelectItem value="ANPR Detection">ANPR Detection</SelectItem>
                  <SelectItem value="Facial Recognition">Facial Recognition</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Accuracy (%)</Label>
                <Input type="number" value={form.accuracy} onChange={e => setForm(f => ({ ...f, accuracy: e.target.value }))} className="bg-secondary border-border" />
              </div>
              <div className="space-y-2">
                <Label>False Positive (%)</Label>
                <Input type="number" value={form.falsePositive} onChange={e => setForm(f => ({ ...f, falsePositive: e.target.value }))} className="bg-secondary border-border" />
              </div>
              <div className="space-y-2">
                <Label>Inference Time (ms)</Label>
                <Input type="number" value={form.inferenceTime} onChange={e => setForm(f => ({ ...f, inferenceTime: e.target.value }))} className="bg-secondary border-border" />
              </div>
              <div className="space-y-2">
                <Label>Version</Label>
                <Input value={form.version} onChange={e => setForm(f => ({ ...f, version: e.target.value }))} className="bg-secondary border-border" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="border-border">Cancel</Button>
            <Button onClick={handleSave} className="bg-primary text-primary-foreground">{editingModel ? "Update Model" : "Deploy Model"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="bg-card border-glass-border max-w-sm">
          <DialogHeader>
            <DialogTitle>Remove Model</DialogTitle>
            <DialogDescription>Are you sure you want to remove <strong>{models.find(m => m.id === deleteConfirm)?.name}</strong>? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)} className="border-border">Cancel</Button>
            <Button variant="destructive" onClick={() => deleteConfirm && handleDelete(deleteConfirm)}>Remove</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIModels;
