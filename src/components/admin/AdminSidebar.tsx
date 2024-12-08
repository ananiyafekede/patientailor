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
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/admin/dashboard"
  },
  {
    title: "Users",
    icon: Users,
    url: "#"
  },
  {
    title: "Appointments",
    icon: Calendar,
    url: "#"
  },
  {
    title: "Database",
    icon: Database,
    url: "#"
  },
  {
    title: "Notifications",
    icon: Bell,
    url: "#"
  },
  {
    title: "Settings",
    icon: Settings,
    url: "#"
  }
];

export function AdminSidebar() {
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
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-3 px-3 py-2">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
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