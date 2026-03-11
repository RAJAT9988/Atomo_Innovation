import {
  LayoutDashboard, Users, Bug, Package, Truck, Camera, Cpu, Brain, Settings, AlertTriangle, BarChart3,
  Blocks,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import atomoLogo from "@/assets/atomo-logo.png";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Command Center", url: "/", icon: LayoutDashboard },
  { title: "Person Detection", url: "/person-detection", icon: Users },
  { title: "Animal Detection", url: "/animal-detection", icon: Bug },
  { title: "Sack/Box Counter", url: "/inventory", icon: Package },
  { title: "ANPR Tracking", url: "/anpr", icon: Truck },
  { title: "Digital Twin", url: "/digital-twin", icon: Blocks },
];

const systemItems = [
  { title: "Camera Monitor", url: "/cameras", icon: Camera },
  { title: "Edge Devices", url: "/devices", icon: Cpu },
  { title: "AI Models", url: "/models", icon: Brain },
  { title: "Alert Center", url: "/alerts", icon: AlertTriangle },
  { title: "Reports", url: "/reports", icon: BarChart3 },
];

const AppSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const renderGroup = (label: string, items: typeof mainItems) => (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-muted-foreground/60">{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title}>
                <NavLink
                  to={item.url}
                  end={item.url === "/"}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                    isActive(item.url)
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  }`}
                  activeClassName=""
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon" className="border-r border-border/30">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <img src={atomoLogo} alt="Atomo Innovations" className="h-8 w-8" />
          {!collapsed && (
            <div>
              <p className="text-sm font-bold tracking-wide">ATOMO</p>
              <p className="text-[9px] text-muted-foreground uppercase tracking-widest">AI Surveillance</p>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        {renderGroup("Operations", mainItems)}
        {renderGroup("System", systemItems)}
      </SidebarContent>
      <SidebarFooter className="p-3">
        {!collapsed && (
          <div className="glass-panel p-2.5 text-center">
            <p className="text-[9px] text-muted-foreground">Atomo Innovations Pvt Ltd</p>
            <p className="text-[9px] text-primary font-mono">v2.4.1</p>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
