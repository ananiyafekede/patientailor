import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Calendar, Clock, DollarSign, FileText, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import AppointmentList from "@/components/patient/AppointmentList";
import BookAppointment from "@/components/patient/BookAppointment";
import MedicalHistory from "@/components/patient/MedicalHistory";
import ProfileSettings from "@/components/patient/ProfileSettings";
import BillingHistory from "@/components/patient/BillingHistory";
import FeedbackForm from "@/components/patient/FeedbackForm";
import { Button } from "@/components/ui/button";

const PatientDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  useEffect(() => {
    setSearchParams({ tab: "appointments" });
  }, []);
  const appointments = [];
  const currentTab = searchParams.get("tab") || "appointments";

  const handleTabChange = (tab: string) => {
    setSearchParams({ tab });
  };

  return (
    <>
      <Helmet>
        <title>Patient Dashboard - Hospital Management System</title>
      </Helmet>

      <div className="container mx-auto p-6 space-y-6 bg-gradient-to-br from-blue-50 to-[#2563EB]/10 min-h-screen">
        <div className="flex justify-between items-center">
          <h1 className="text-base md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-blue-700">
            {user?.username}
          </h1>
          <Button className="bg-[#2563EB] hover:bg-blue-700 text-white">
            <User className="mr-2 h-4 w-4" />
            Profile Settings
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-white/50 backdrop-blur border-none shadow-lg hover:shadow-xl transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Appointments
              </CardTitle>
              <Calendar className="h-4 w-4 text-[#2563EB]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#2563EB]">
                {appointments?.length || 0}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/50 backdrop-blur border-none shadow-lg hover:shadow-xl transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <Clock className="h-4 w-4 text-[#2563EB]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#2563EB]">
                {appointments?.filter(
                  (apt) => new Date(apt.appointment_date) > new Date()
                ).length || 0}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/50 backdrop-blur border-none shadow-lg hover:shadow-xl transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Bills
              </CardTitle>
              <DollarSign className="h-4 w-4 text-[#2563EB]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#2563EB]">0</div>
            </CardContent>
          </Card>
          <Card className="bg-white/50 backdrop-blur border-none shadow-lg hover:shadow-xl transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Medical Records
              </CardTitle>
              <FileText className="h-4 w-4 text-[#2563EB]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#2563EB]">0</div>
            </CardContent>
          </Card>
        </div>

        <Tabs
          value={currentTab}
          onValueChange={handleTabChange}
          className="space-y-4 "
        >
          <TabsList className="bg-white/50 backdrop-blur border-none shadow-md w-full overflow-x-auto">
            <TabsTrigger
              value="appointments"
              className="data-[state=active]:bg-[#2563EB] data-[state=active]:text-white"
            >
              Appointments
            </TabsTrigger>
            <TabsTrigger
              value="book"
              className="data-[state=active]:bg-[#2563EB] data-[state=active]:text-white"
            >
              Book Appointment
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-[#2563EB] data-[state=active]:text-white"
            >
              Medical History
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-[#2563EB] data-[state=active]:text-white"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="billing"
              className="data-[state=active]:bg-[#2563EB] data-[state=active]:text-white"
            >
              Billing
            </TabsTrigger>
            <TabsTrigger
              value="feedback"
              className="data-[state=active]:bg-[#2563EB] data-[state=active]:text-white"
            >
              Feedback
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            <AppointmentList />
          </TabsContent>

          <TabsContent value="book">
            <BookAppointment />
          </TabsContent>

          <TabsContent value="history">
            <MedicalHistory />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileSettings profile={user} />
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
