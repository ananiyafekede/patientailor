import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

const AppointmentList = () => {
  const { data: appointments, isLoading, error } = useQuery({
    queryKey: ['appointments'],
    queryFn: async () => {
      // First get the current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');
      
      console.log('Current user ID:', user.id);
      
      // First get the patient record to get the integer user_id
      const { data: patientData, error: patientError } = await supabase
        .from('patients')
        .select('user_id')
        .single();
        
      if (patientError) {
        console.error('Error fetching patient:', patientError);
        throw patientError;
      }
      
      console.log('Patient data:', patientData);
      
      // Now use the patient's user_id to get appointments
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
        .eq('patient_id', patientData.user_id)
        .order('appointment_date', { ascending: true });
        
      if (error) {
        console.error('Error fetching appointments:', error);
        throw error;
      }
      
      console.log('Appointments:', data);
      return data as Appointment[];
    }
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      case "pending":
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Card className="bg-white/50 backdrop-blur border-none shadow-lg">
        <CardContent className="pt-6">
          <div className="text-center text-red-500">
            Error loading appointments. Please try again later.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/50 backdrop-blur border-none shadow-lg">
      <CardHeader>
        <CardTitle>Your Appointments</CardTitle>
        <CardDescription>View and manage your upcoming and past appointments</CardDescription>
      </CardHeader>
      <CardContent>
        {!appointments || appointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40">
            <p className="text-muted-foreground">No appointments found</p>
            <Button variant="outline" className="mt-4">Book an Appointment</Button>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">Dr. {appointment.doctors.specialty}</p>
                        <p className="text-sm text-muted-foreground">{appointment.doctors.qualification}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        {format(new Date(appointment.appointment_date), "PPP")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        {format(new Date(`2000-01-01T${appointment.appointment_time}`), "p")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentList;