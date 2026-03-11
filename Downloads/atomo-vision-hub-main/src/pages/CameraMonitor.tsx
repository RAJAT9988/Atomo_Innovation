import { useState } from "react";
import { Camera, Wifi, WifiOff, Plus, Trash2, Edit, Settings } from "lucide-react";
import { cameras as initialCameras } from "@/lib/mockData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

type CameraItem = typeof initialCameras[0];

const CameraMonitor = () => {
  const [cameras, setCameras] = useState<CameraItem[]>(initialCameras);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCamera, setEditingCamera] = useState<CameraItem | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "", location: "", ip: "", detectionType: "Person Detection", rtspUrl: "", resolution: "1080p", fps: "30",
  });

  const resetForm = () => setForm({ name: "", location: "", ip: "", detectionType: "Person Detection", rtspUrl: "", resolution: "1080p", fps: "30" });

  const openAdd = () => { resetForm(); setEditingCamera(null); setDialogOpen(true); };

  const openEdit = (c: CameraItem) => {
    setEditingCamera(c);
    setForm({ name: c.name, location: c.location, ip: c.ip, detectionType: c.detectionType, rtspUrl: `rtsp://${c.ip}:554/stream`, resolution: "1080p", fps: "30" });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.ip.trim()) { toast({ title: "Name and IP are required", variant: "destructive" }); return; }

    if (editingCamera) {
      setCameras(prev => prev.map(c => c.id === editingCamera.id ? {
        ...c, name: form.name, location: form.location, ip: form.ip, detectionType: form.detectionType,
      } : c));
      toast({ title: "Camera updated", description: `${form.name} has been updated.` });
    } else {
      const newCam: CameraItem = {
        id: `CAM-${String(cameras.length + 1).padStart(3, "0")}`,
        name: form.name, location: form.location, ip: form.ip, detectionType: form.detectionType,
        status: "online", lastAlert: "—",
      };
      setCameras(prev => [...prev, newCam]);
      toast({ title: "Camera added", description: `${form.name} is now connected.` });
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    const name = cameras.find(c => c.id === id)?.name;
    setCameras(prev => prev.filter(c => c.id !== id));
    setDeleteConfirm(null);
    toast({ title: "Camera removed", description: `${name} has been disconnected.` });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Camera Management</h1>
          <p className="text-sm text-muted-foreground">{cameras.length} cameras • {cameras.filter(c => c.status === "online").length} online</p>
        </div>
        <Button onClick={openAdd} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Add Camera
        </Button>
      </div>

      <div className="glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30 text-xs text-muted-foreground uppercase tracking-wider">
                <th className="px-4 py-3 text-left">Camera</th>
                <th className="px-4 py-3 text-left">IP Address</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Detection</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Last Alert</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cameras.map((c) => (
                <tr key={c.id} className="border-b border-border/20 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3 flex items-center gap-2">
                    <Camera className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{c.name}</p>
                      <p className="text-[10px] text-muted-foreground">{c.id}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{c.ip}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.location}</td>
                  <td className="px-4 py-3 text-xs text-primary">{c.detectionType}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      c.status === "online" ? "bg-neon-green/15 text-neon-green" : "bg-neon-red/15 text-neon-red"
                    }`}>
                      {c.status === "online" ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{c.lastAlert}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(c)} className="p-1.5 rounded-md bg-secondary text-muted-foreground hover:text-foreground transition-colors" title="Edit">
                        <Edit className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => setDeleteConfirm(c.id)} className="p-1.5 rounded-md bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors" title="Remove">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-card border-glass-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              {editingCamera ? "Edit Camera" : "Add New Camera"}
            </DialogTitle>
            <DialogDescription>{editingCamera ? "Update camera configuration" : "Connect a new camera to the surveillance system"}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Camera Name</Label>
                <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Main Gate Entry" className="bg-secondary border-border" />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="e.g. Gate A" className="bg-secondary border-border" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>IP Address</Label>
              <Input value={form.ip} onChange={e => setForm(f => ({ ...f, ip: e.target.value }))} placeholder="192.168.1.xxx" className="bg-secondary border-border font-mono" />
            </div>
            <div className="space-y-2">
              <Label>RTSP Stream URL</Label>
              <Input value={form.rtspUrl} onChange={e => setForm(f => ({ ...f, rtspUrl: e.target.value }))} placeholder="rtsp://192.168.1.xxx:554/stream" className="bg-secondary border-border font-mono text-xs" />
            </div>
            <div className="space-y-2">
              <Label>AI Detection Model</Label>
              <Select value={form.detectionType} onValueChange={v => setForm(f => ({ ...f, detectionType: v }))}>
                <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-card border-glass-border">
                  <SelectItem value="Person Detection">Person Detection</SelectItem>
                  <SelectItem value="Animal Detection">Animal Detection</SelectItem>
                  <SelectItem value="Sack Counter">Sack Counter</SelectItem>
                  <SelectItem value="ANPR Detection">ANPR Detection</SelectItem>
                  <SelectItem value="Person + ANPR">Person + ANPR</SelectItem>
                  <SelectItem value="Animal + Person">Animal + Person</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Resolution</Label>
                <Select value={form.resolution} onValueChange={v => setForm(f => ({ ...f, resolution: v }))}>
                  <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-card border-glass-border">
                    <SelectItem value="720p">720p</SelectItem>
                    <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                    <SelectItem value="2K">2K</SelectItem>
                    <SelectItem value="4K">4K (Ultra HD)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>FPS</Label>
                <Select value={form.fps} onValueChange={v => setForm(f => ({ ...f, fps: v }))}>
                  <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-card border-glass-border">
                    <SelectItem value="15">15 FPS</SelectItem>
                    <SelectItem value="25">25 FPS</SelectItem>
                    <SelectItem value="30">30 FPS</SelectItem>
                    <SelectItem value="60">60 FPS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="border-border">Cancel</Button>
            <Button onClick={handleSave} className="bg-primary text-primary-foreground">{editingCamera ? "Update Camera" : "Connect Camera"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="bg-card border-glass-border max-w-sm">
          <DialogHeader>
            <DialogTitle>Remove Camera</DialogTitle>
            <DialogDescription>Are you sure you want to disconnect <strong>{cameras.find(c => c.id === deleteConfirm)?.name}</strong>? The camera will stop recording.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)} className="border-border">Cancel</Button>
            <Button variant="destructive" onClick={() => deleteConfirm && handleDelete(deleteConfirm)}>Disconnect</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CameraMonitor;
