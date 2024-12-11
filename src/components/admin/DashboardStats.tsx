import { motion } from "framer-motion";
import { Users, UserPlus, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const DashboardStats = () => {
  // Static data for development
  const stats = {
    totalDoctors: 25,
    totalPatients: 150,
    totalAppointments: 75
  };

  return (
    <div className="grid gap-6 mb-8 md:grid-cols-3">
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="absolute right-0 top-0 h-full w-24 bg-blue-600/20 transform skew-x-12" />
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5" />
              Total Doctors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalDoctors}</p>
            <p className="text-blue-100 text-sm mt-2">Active medical professionals</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card className="relative overflow-hidden bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="absolute right-0 top-0 h-full w-24 bg-green-600/20 transform skew-x-12" />
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <UserPlus className="h-5 w-5" />
              Total Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalPatients}</p>
            <p className="text-green-100 text-sm mt-2">Registered patients</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="absolute right-0 top-0 h-full w-24 bg-purple-600/20 transform skew-x-12" />
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5" />
              Total Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalAppointments}</p>
            <p className="text-purple-100 text-sm mt-2">Scheduled consultations</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};