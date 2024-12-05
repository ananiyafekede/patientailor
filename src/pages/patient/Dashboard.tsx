import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Calendar, Clock, DollarSign, FileText, MessageSquare, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { Spinner } from "@/components/ui/spinner";
import AppointmentList from "@/components/patient/AppointmentList";
import BookAppointment from "@/components/patient/BookAppointment";
import MedicalHistory from "@/components/patient/MedicalHistory";
import ProfileSettings from "@/components/patient/ProfileSettings";
import BillingHistory from "@/components/patient/BillingHistory";
import FeedbackForm from "@/components/patient/FeedbackForm";

interface Doctor {
  specialty: string;
  qualification: string;
}

interface Appointment {
  id: number;
  appointment_date: string;
  appointment_time: string;
  status: string;
  doctors: Doctor;
}

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("appointments");

  const { data: userProfile, isLoading: profileLoading } = useQuery({
    queryKey: ['userProfile'],
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

  const { data: appointments, isLoading: appointmentsLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user found');
      
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          id,
          appointment_date,
          appointment_time,
          status,
          doctors:doctor_id (
            specialty,
            qualification
          )
        `)
        .eq('patient_id', session.user.id)
        .order('appointment_date', { ascending: true });
        
      if (error) throw error;
      return data as unknown as Appointment[];
    }
  });

  if (profileLoading || appointmentsLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <title>Patient Dashboard - Hospital Management System</title>
      </Helmet>

      <div className="container mx-auto p-6 space-y-6 bg-gradient-to-br from-blue-50 to-[#2563EB]/10 min-h-screen">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-blue-700">
            Welcome, {userProfile?.first_name}
          </h1>
          <Button 
            onClick={() => setActiveTab("profile")}
            className="bg-[#2563EB] hover:bg-blue-700 text-white"
          >
            <User className="mr-2 h-4 w-4" />
            Profile Settings
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-white/50 backdrop-blur border-none shadow-lg hover:shadow-xl transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-[#2563EB]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#2563EB]">{appointments?.length || 0}</div>
            </CardContent>
          </Card>
          <Card className="bg-white/50 backdrop-blur border-none shadow-lg hover:shadow-xl transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <Clock className="h-4 w-4 text-[#2563EB]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#2563EB]">
                {appointments?.filter(apt => new Date(apt.appointment_date) > new Date()).length || 0}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/50 backdrop-blur border-none shadow-lg hover:shadow-xl transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Bills</CardTitle>
              <DollarSign className="h-4 w-4 text-[#2563EB]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#2563EB]">0</div>
            </CardContent>
          </Card>
          <Card className="bg-white/50 backdrop-blur border-none shadow-lg hover:shadow-xl transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Medical Records</CardTitle>
              <FileText className="h-4 w-4 text-[#2563EB]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#2563EB]">0</div>
            </CardContent>
          </Card>
        </div>

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="space-y-4"
        >
          <TabsList className="bg-white/50 backdrop-blur border-none shadow-md">
            <TabsTrigger value="appointments" className="data-[state=active]:bg-[#2563EB] data-[state=active]:text-white">
              Appointments
            </TabsTrigger>
            <TabsTrigger value="book" className="data-[state=active]:bg-[#2563EB] data-[state=active]:text-white">
              Book Appointment
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-[#2563EB] data-[state=active]:text-white">
              Medical History
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-[#2563EB] data-[state=active]:text-white">
              Profile
            </TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:bg-[#2563EB] data-[state=active]:text-white">
              Billing
            </TabsTrigger>
            <TabsTrigger value="feedback" className="data-[state=active]:bg-[#2563EB] data-[state=active]:text-white">
              Feedback
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-4">
            <AppointmentList appointments={appointments || []} />
          </TabsContent>

          <TabsContent value="book">
            <BookAppointment />
          </TabsContent>

          <TabsContent value="history">
            <MedicalHistory />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileSettings profile={userProfile} />
          </TabsContent>

          <TabsContent value="billing">
            <BillingHistory />
          </TabsContent>

          <TabsContent value="feedback">
            <FeedbackForm />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default PatientDashboard;
