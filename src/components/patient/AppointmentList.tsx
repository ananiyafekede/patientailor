import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

interface AppointmentListProps {
  appointments: Appointment[];
}

const AppointmentList = ({ appointments }: AppointmentListProps) => {
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

  return (
    <Card className="bg-white/50 backdrop-blur border-none shadow-lg">
      <CardHeader>
        <CardTitle>Your Appointments</CardTitle>
        <CardDescription>View and manage your upcoming and past appointments</CardDescription>
      </CardHeader>
      <CardContent>
        {appointments.length === 0 ? (
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