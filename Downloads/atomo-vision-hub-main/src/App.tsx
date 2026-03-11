import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CommandCenter from "@/pages/CommandCenter";
import PersonDetection from "@/pages/PersonDetection";
import AnimalDetection from "@/pages/AnimalDetection";
import Inventory from "@/pages/Inventory";
import ANPRTracking from "@/pages/ANPRTracking";
import DigitalTwin from "@/pages/DigitalTwin";
import CameraMonitor from "@/pages/CameraMonitor";
import EdgeDevices from "@/pages/EdgeDevices";
import AIModels from "@/pages/AIModels";
import AlertCenter from "@/pages/AlertCenter";
import Reports from "@/pages/Reports";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<CommandCenter />} />
            <Route path="/person-detection" element={<PersonDetection />} />
            <Route path="/animal-detection" element={<AnimalDetection />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/anpr" element={<ANPRTracking />} />
            <Route path="/digital-twin" element={<DigitalTwin />} />
            <Route path="/cameras" element={<CameraMonitor />} />
            <Route path="/devices" element={<EdgeDevices />} />
            <Route path="/models" element={<AIModels />} />
            <Route path="/alerts" element={<AlertCenter />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
