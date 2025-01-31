import { Helmet } from "react-helmet-async";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Hospital Management System</title>
      </Helmet>

      <SidebarProvider>
        <div className="min-h-screen flex flex-col md:flex-row w-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
          <div className="md:w-64 flex-shrink-0">
            <AdminSidebar />
          </div>
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </>
  );
};

export default AdminDashboard;
