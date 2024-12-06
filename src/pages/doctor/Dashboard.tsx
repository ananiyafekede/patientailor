import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  Users, 
  ClipboardList,
  Building2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Spinner } from "@/components/ui/spinner";
import AppointmentList from "@/components/doctor/AppointmentList";

interface DoctorProfile {
  id: string;
  first_name: string;
  last_name: string;
  role: string;
}

interface DoctorDetails {
  specialty: string;
  qualification: string;
  experience_years: number;
}

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
  const navigate = useNavigate();
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
      return data as DoctorProfile;
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
      return data as DoctorDetails;
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

      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome Dr. {doctorProfile?.first_name} {doctorProfile?.last_name}!
            </h1>
            <p className="text-muted-foreground">
              You have {todayAppointments} patients remaining today
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>
                {doctorProfile?.first_name?.[0]}{doctorProfile?.last_name?.[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Dr. {doctorProfile?.first_name} {doctorProfile?.last_name}</p>
              <p className="text-sm text-muted-foreground">{doctorDetails?.specialty}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPatients}</div>
              <p className="text-xs text-muted-foreground">
                +20% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayAppointments}</div>
              <p className="text-xs text-muted-foreground">
                {completedToday} completed
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$3,204</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">
                Based on 129 reviews
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="income" fill="#2563EB" />
                    <Bar dataKey="expense" fill="#E11D48" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>P{i + 1}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Patient {i + 1}</p>
                      <p className="text-xs text-muted-foreground">
                        Appointment completed
                      </p>
                    </div>
                    <Badge variant="secondary">
                      {format(new Date(), 'HH:mm')}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <AppointmentList />
      </div>
    </>
  );
};

export default DoctorDashboard;