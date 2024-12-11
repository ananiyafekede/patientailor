import { useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Settings,
  Database,
  Bell
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Overview",
    icon: LayoutDashboard,
    url: "/admin/dashboard"
  },
  {
    title: "Users",
    icon: Users,
    url: "/admin/users"
  },
  {
    title: "Appointments",
    icon: Calendar,
    url: "/admin/appointments"
  },
  {
    title: "Database",
    icon: Database,
    url: "/admin/database"
  },
  {
    title: "Notifications",
    icon: Bell,
    url: "/admin/notifications"
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/admin/settings"
  }
];

export function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActiveRoute = (path: string) => {
    // Handle both exact matches and sub-routes
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-4">
          <h2 className="text-xl font-bold text-primary">Hospital Admin</h2>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.url)}
                    className={`flex items-center gap-3 px-3 py-2 w-full transition-colors ${
                      isActiveRoute(item.url)
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}