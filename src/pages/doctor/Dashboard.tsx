import { Helmet } from "react-helmet-async";
import { Spinner } from "@/components/ui/spinner";
import AppointmentList from "@/components/doctor/AppointmentList";
import { DashboardHeader } from "@/components/doctor/DashboardHeader";
import { MetricsCards } from "@/components/doctor/MetricsCards";
import { AnalyticsSection } from "@/components/doctor/AnalyticsSection";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import useGetDetail from "@/hooks/doctor/useGetDetail";

const revenueData = [
  { name: "Mon", income: 3200, expense: 1700 },
  { name: "Tue", income: 4500, expense: 2100 },
  { name: "Wed", income: 3800, expense: 1800 },
  { name: "Thu", income: 4100, expense: 1900 },
  { name: "Fri", income: 3700, expense: 1600 },
  { name: "Sat", income: 3500, expense: 1500 },
  { name: "Sun", income: 3900, expense: 1800 },
];

const DoctorDashboard = () => {
  const [todayAppointments, setTodayAppointments] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const [completedToday, setCompletedToday] = useState(0);
  const { user: doctorProfile } = useAuth();
  const { isLoading, doctorDetail } = useGetDetail(String(doctorProfile.id));

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
        <title>Doctor Dashboard - Hospital Management System</title>
      </Helmet>

      <div className="container mx-auto p-6 space-y-6 bg-gray-50 min-h-screen">
        <DashboardHeader
          username={doctorProfile?.username}
          specialty={doctorDetail.specialty}
          appointmentsToday={todayAppointments}
        />

        <MetricsCards
          totalPatients={totalPatients}
          todayAppointments={todayAppointments}
          completedToday={completedToday}
          revenue={3204}
          rating={4.8}
        />

        <AnalyticsSection revenueData={revenueData} />

        <AppointmentList />
      </div>
    </>
  );
};

export default DoctorDashboard;
