import { Helmet } from "react-helmet-async";
import { Spinner } from "@/components/ui/spinner";
import AppointmentList from "@/components/doctor/AppointmentList";
import { DashboardHeader } from "@/components/doctor/DashboardHeader";
import { MetricsCards } from "@/components/doctor/MetricsCards";
import { AnalyticsSection } from "@/components/doctor/AnalyticsSection";
import ScheduleManager from "@/components/doctor/ScheduleManager";
import PatientsList from "@/components/doctor/PatientsList";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import {
  useGetDoctorAppointment,
  useGetDoctorById,
  useGetDoctorPatients,
} from "@/hooks/doctor";
import { toast } from "react-hot-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  const {
    doctor: detail,
    isLoading: isLoadingDetail,
    error: detailError,
  } = useGetDoctorById(doctorProfile.id);

  // Fetch appointments
  const {
    appointments,
    isLoading: isLoadingAppointments,
    error: appointmentsError,
  } = useGetDoctorAppointment();

  // Fetch patients
  const {
    patients,
    isLoading: isLoadingPatients,
    error: patientsError,
  } = useGetDoctorPatients();

  useEffect(() => {
    if (appointments?.length) {
      // Get today's date in YYYY-MM-DD format
      const today = new Date().toISOString().split("T")[0];

      // Count today's appointments
      const todayAppts = appointments.filter(
        (appt) => appt.appointment_date === today
      );
      setTodayAppointments(todayAppts.length);

      // Count completed appointments
      const completed = todayAppts.filter(
        (appt) => appt.status === "completed"
      );
      setCompletedToday(completed.length);
    }
  }, [appointments]);

  useEffect(() => {
    if (patients?.length) {
      setTotalPatients(patients.length);
    }
  }, [patients]);

  useEffect(() => {
    // Show errors if any
    if (detailError) {
      toast.error("Failed to load doctor details");
      console.error(detailError);
    }

    if (appointmentsError) {
      toast.error("Failed to load appointments");
      console.error(appointmentsError);
    }

    if (patientsError) {
      toast.error("Failed to load patients");
      console.error(patientsError);
    }
  }, [detailError, appointmentsError, patientsError]);

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <Spinner />
  //     </div>
  //   );
  // }

  return (
    <>
      <Helmet>
        <title>Doctor Dashboard - Hospital Management System</title>
      </Helmet>

      <div className="container mx-auto p-6 space-y-6 bg-gray-50 min-h-screen">
        {isLoadingDetail ? (
          <p>Loading...</p>
        ) : (
          <DashboardHeader
            username={doctorProfile.username}
            specialty={detail?.specialty || ""}
            appointmentsToday={todayAppointments}
          />
        )}

        <MetricsCards
          totalPatients={totalPatients}
          todayAppointments={todayAppointments}
          completedToday={completedToday}
          revenue={3204}
          rating={4.8}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnalyticsSection revenueData={revenueData} />

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Schedule Management</h2>
            <div className="space-y-4">
              <ScheduleManager />
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <Tabs defaultValue="appointments" className="space-y-4">
            <TabsList>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="patients">Patients</TabsTrigger>
            </TabsList>

            <TabsContent value="appointments">
              <h2 className="text-xl font-semibold mb-4">Appointments</h2>
              {isLoadingAppointments ? <p>loading...</p> : <AppointmentList />}
            </TabsContent>

            <TabsContent value="patients">
              <h2 className="text-xl font-semibold mb-4">My Patients</h2>
              {isLoadingPatients ? <p>loading...</p> : <PatientsList />}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default DoctorDashboard;
