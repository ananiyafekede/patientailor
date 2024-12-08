import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { DashboardCharts } from "@/components/admin/DashboardCharts";
import { Spinner } from "@/components/ui/spinner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Hospital Management System</title>
      </Helmet>

      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
          <AdminSidebar />
          <main className="flex-1 p-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Admin Dashboard
                </h1>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Last updated: {new Date().toLocaleString()}
                  </span>
                </div>
              </div>
              
              <DashboardStats stats={stats} />
              <DashboardCharts />
            </motion.div>
          </main>
        </div>
      </SidebarProvider>
    </>
  );
};

export default AdminDashboard;