import { DashboardStats } from "@/components/admin/DashboardStats";
import { DashboardCharts } from "@/components/admin/DashboardCharts";

import { Spinner } from "@/components/ui/spinner";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const stats = { totalDoctors: 25, totalPatients: 150, totalAppointments: 75 };
  const isLoading = false;
  return (
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
        </>
      )}
    </motion.div>
  );
}
