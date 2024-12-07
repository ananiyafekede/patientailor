import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Spinner } from "@/components/ui/spinner";
import AppointmentList from "@/components/doctor/AppointmentList";
import { DashboardHeader } from "@/components/doctor/DashboardHeader";
import { MetricsCards } from "@/components/doctor/MetricsCards";
import { AnalyticsSection } from "@/components/doctor/AnalyticsSection";
import toast from "react-hot-toast";

// Sample revenue data (we'll replace this with real data later)
const revenueData = [
  { name: 'Mon', income: 3200, expense: 1700 },
  { name: 'Tue', income: 4500, expense: 2100 },
  { name: 'Wed', income: 3800, expense: 1800 },
  { name: 'Thu', income: 4100, expense: 1900 },
  { name: 'Fri', income: 3700, expense: 1600 },
  { name: 'Sat', income: 3500, expense: 1500 },
  { name: 'Sun', income: 3900, expense: 1800 },
];

const DoctorDashboard = () => {
  const [todayAppointments, setTodayAppointments] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const [completedToday, setCompletedToday] = useState(0);

  // Fetch doctor profile data
  const { data: doctorProfile, isLoading: profileLoading, error: profileError } = useQuery({
    queryKey: ['doctorProfile'],
    queryFn: async () => {
      console.log('Fetching doctor profile...');
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');
      
      console.log('Current user:', user);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (error) {
        console.error('Error fetching profile:', error);
        throw error;
      }
      
      console.log('Profile data:', data);
      return data;
    }
  });

  // Fetch doctor details
  const { data: doctorDetails, isLoading: detailsLoading, error: detailsError } = useQuery({
    queryKey: ['doctorDetails'],
    queryFn: async () => {
      console.log('Fetching doctor details...');
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');
      
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .eq('user_id', user.id)
        .single();
        
      if (error) {
        console.error('Error fetching doctor details:', error);
        throw error;
      }
      
      console.log('Doctor details:', data);
      return data;
    }
  });

  // Fetch metrics data
  useEffect(() => {
    const fetchMetrics = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get today's appointments count
      const { data: todayAppts, error: todayError } = await supabase
        .from('appointments')
        .select('*')
        .eq('doctor_id', user.id)
        .eq('appointment_date', new Date().toISOString().split('T')[0]);

      if (!todayError && todayAppts) {
        setTodayAppointments(todayAppts.length);
        setCompletedToday(todayAppts.filter(apt => apt.is_completed).length);
      }

      // Get total unique patients
      const { count: patientsCount, error: patientsError } = await supabase
        .from('appointments')
        .select('patient_id', { count: 'exact', head: true })
        .eq('doctor_id', user.id);

      if (!patientsError) {
        setTotalPatients(patientsCount || 0);
      }
    };

    fetchMetrics();
  }, []);

  // Handle errors
  useEffect(() => {
    if (profileError) {
      toast.error('Error loading profile data');
      console.error('Profile error:', profileError);
    }
    if (detailsError) {
      toast.error('Error loading doctor details');
      console.error('Details error:', detailsError);
    }
  }, [profileError, detailsError]);

  if (profileLoading || detailsLoading) {
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
          firstName={doctorProfile?.first_name}
          lastName={doctorProfile?.last_name}
          specialty={doctorDetails?.specialty}
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