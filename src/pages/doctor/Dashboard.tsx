
import { Helmet } from "react-helmet-async";
import { Spinner } from "@/components/ui/spinner";
import AppointmentList from "@/components/doctor/AppointmentList";
import { DashboardHeader } from "@/components/doctor/DashboardHeader";
import { MetricsCards } from "@/components/doctor/MetricsCards";
import { AnalyticsSection } from "@/components/doctor/AnalyticsSection";
import ScheduleManager from "@/components/doctor/ScheduleManager";
import PatientsList from "@/components/doctor/PatientsList";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState, useCallback } from "react";
import {
  useGetDoctorAppointment,
  useGetDoctorById,
  useGetDoctorPatients,
} from "@/hooks/doctor";
import { toast } from "react-hot-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQueryParams } from "@/hooks/useQueryParams";

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

  // Manage query params for tab switching
  const { setQueryParams, queryParams } = useQueryParams({
    _tab: "appointments",
  });
  const currentTab = queryParams._tab || "appointments";

  const handleTabChange = useCallback((tab: string) => {
    // When changing tabs, reset tab-specific URL parameters
    // Only update if the tab actually changes
    if (tab !== currentTab) {
      const updatedParams: Record<string, any> = { _tab: tab };
      
      // Clear appointment view when switching away from appointments tab
      if (tab !== "appointments") {
        updatedParams._appointment_view = undefined;
      }
      
      setQueryParams(updatedParams);
    }
  }, [currentTab, setQueryParams]);

  const {
    doctor: detail,
    isLoading: isLoadingDetail,
    error: detailError,
  } = useGetDoctorById(doctorProfile?.id);

  // Only fetch appointments data for metrics, using minimal query params
  const {
    appointments,
    isLoading: isLoadingAppointments,
    error: appointmentsError,
  } = useGetDoctorAppointment({ limit: 100 });

  const {
    patients,
    isLoading: isLoadingPatients,
    error: patientsError,
  } = useGetDoctorPatients();

  useEffect(() => {
    if (appointments?.length) {
      const today = new Date().toISOString().split("T")[0];

      const todayAppts = appointments.filter(
        (appt) => appt.appointment_date === today
      );
      setTodayAppointments(todayAppts.length);

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

  return (
    <>
      <Helmet>
        <title>Doctor Dashboard - Hospital Management System</title>
      </Helmet>

      <div className="container mx-auto p-4 md:p-6 space-y-4 md:space-y-6 bg-gray-50 min-h-screen">
        {isLoadingDetail ? (
          <div className="flex justify-center py-12">
            <Spinner />
          </div>
        ) : (
          <DashboardHeader
            username={doctorProfile?.username}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <AnalyticsSection revenueData={revenueData} />

          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Schedule Management</h2>
            <div className="space-y-4">
              <ScheduleManager />
            </div>
          </div>
        </div>

        <div className="mt-4 md:mt-6 bg-white rounded-lg shadow-md p-4 md:p-6">
          <Tabs
            value={currentTab}
            onValueChange={handleTabChange}
            className="space-y-4"
          >
            <TabsList className="w-full md:w-auto overflow-x-auto">
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="patients">Patients</TabsTrigger>
            </TabsList>

            <TabsContent value="appointments" className="pt-2">
              <h2 className="text-xl font-semibold mb-4">Appointments</h2>
              <AppointmentList />
            </TabsContent>

            <TabsContent value="patients" className="pt-2">
              <h2 className="text-xl font-semibold mb-4">My Patients</h2>
              {isLoadingPatients ? (
                <div className="flex justify-center py-12">
                  <Spinner />
                </div>
              ) : (
                <PatientsList />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default DoctorDashboard;
