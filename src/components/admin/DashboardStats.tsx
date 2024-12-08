import { motion } from "framer-motion";
import { Users, UserPlus, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardStatsProps {
  stats: {
    totalDoctors: number;
    totalPatients: number;
    totalAppointments: number;
  } | undefined;
}

export const DashboardStats = ({ stats }: DashboardStatsProps) => {
  return (
    <div className="grid gap-6 mb-8 md:grid-cols-3">
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6" />
              Total Doctors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{stats?.totalDoctors}</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-6 w-6" />
              Total Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{stats?.totalPatients}</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-6 w-6" />
              Total Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{stats?.totalAppointments}</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};