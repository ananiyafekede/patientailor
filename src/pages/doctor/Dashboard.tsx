import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Spinner } from "@/components/ui/spinner";
import AppointmentList from "@/components/doctor/AppointmentList";
import { DashboardHeader } from "@/components/doctor/DashboardHeader";
import { MetricsCards } from "@/components/doctor/MetricsCards";
import { AnalyticsSection } from "@/components/doctor/AnalyticsSection";

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

  const { data: doctorProfile, isLoading: profileLoading } = useQuery({
    queryKey: ['doctorProfile'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user found');
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      if (error) throw error;
      return data;
    }
  });

  const { data: doctorDetails, isLoading: detailsLoading } = useQuery({
    queryKey: ['doctorDetails'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user found');
      
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .eq('user_id', session.user.id)
        .single();
        
      if (error) throw error;
      return data;
    }
  });

  if (profileLoading || detailsLoading) {
    return <Spinner />;
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