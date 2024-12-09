import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { DashboardCharts } from "@/components/admin/DashboardCharts";
import { UsersTable } from "@/components/admin/UsersTable";
import { AppointmentsTable } from "@/components/admin/AppointmentsTable";
import { NotificationsTable } from "@/components/admin/NotificationsTable";
import { Spinner } from "@/components/ui/spinner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      console.log('Fetching admin statistics...');
      
      const { data: doctorsData, error: doctorsError } = await supabase
        .from('doctors')
        .select('*', { count: 'exact' });

      if (doctorsError) throw doctorsError;

      const { data: patientsData, error: patientsError } = await supabase
        .from('patients')
        .select('*', { count: 'exact' });

      if (patientsError) throw patientsError;

      const { data: appointmentsData, error: appointmentsError } = await supabase
        .from('appointments')
        .select('*', { count: 'exact' });

      if (appointmentsError) throw appointmentsError;

      return {
        totalDoctors: doctorsData?.length || 0,
        totalPatients: patientsData?.length || 0,
        totalAppointments: appointmentsData?.length || 0,
      };
    }
  });

  useEffect(() => {
    if (error) {
      toast.error('Error loading statistics');
      console.error('Statistics error:', error);
    }
  }, [error]);

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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                  Admin Dashboard
                </h1>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Last updated: {new Date().toLocaleString()}
                  </span>
                </div>
              </div>
              
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  <DashboardStats stats={stats} />
                  <DashboardCharts />
                  
                  <Tabs defaultValue="users" className="space-y-6">
                    <TabsList className="bg-white/50 backdrop-blur border-none">
                      <TabsTrigger value="users">Users</TabsTrigger>
                      <TabsTrigger value="appointments">Appointments</TabsTrigger>
                      <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="users" className="space-y-4">
                      <UsersTable />
                    </TabsContent>
                    
                    <TabsContent value="appointments" className="space-y-4">
                      <AppointmentsTable />
                    </TabsContent>
                    
                    <TabsContent value="notifications" className="space-y-4">
                      <NotificationsTable />
                    </TabsContent>
                  </Tabs>
                </>
              )}
            </motion.div>
          </main>
        </div>
      </SidebarProvider>
    </>
  );
};

export default AdminDashboard;