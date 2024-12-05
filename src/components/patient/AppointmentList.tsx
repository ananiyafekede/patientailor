import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Appointment {
  id: number;
  appointment_date: string;
  appointment_time: string;
  status: string;
  doctors: {
    specialty: string;
    qualification: string;
  };
}

interface AppointmentListProps {
  appointments: Appointment[];
}

const AppointmentList = ({ appointments }: AppointmentListProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Appointments</h2>
      </div>

      {appointments.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-40">
            <p className="text-muted-foreground">No appointments found</p>
            <Button variant="outline" className="mt-4">Book an Appointment</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {appointments.map((appointment) => (
            <Card key={appointment.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Dr. {appointment.doctors.specialty}</CardTitle>
                    <CardDescription>{appointment.doctors.qualification}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    {format(new Date(appointment.appointment_date), "PPP")}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    {format(new Date(`2000-01-01T${appointment.appointment_time}`), "p")}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentList;