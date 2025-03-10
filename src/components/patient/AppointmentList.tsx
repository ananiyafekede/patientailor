
import { format } from "date-fns";
import { Calendar, Clock, Loader, Eye, Edit, X, MoreVertical } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useGetPatientAppointments } from "@/hooks/patient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const AppointmentList = () => {
  const navigate = useNavigate();
  const { isLoading, error, appointments } = useGetPatientAppointments();
  const [filter, setFilter] = useState("all"); // all, upcoming, past

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500";
      case "cancelled":
      case "canceled":
        return "bg-red-500";
      case "pending":
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
    }
  };

  const filteredAppointments = appointments?.filter((appointment) => {
    const appointmentDate = new Date(appointment.appointment_date);
    const today = new Date();
    
    if (filter === "upcoming") {
      return appointmentDate >= today && appointment.status.toLowerCase() !== "cancelled";
    } else if (filter === "past") {
      return appointmentDate < today || appointment.status.toLowerCase() === "completed";
    }
    return true;
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Error loading appointments. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="bg-white/50 backdrop-blur border-none shadow-lg">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle>Your Appointments</CardTitle>
            <CardDescription>
              View and manage your upcoming and past appointments
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              variant={filter === "all" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button 
              variant={filter === "upcoming" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("upcoming")}
            >
              Upcoming
            </Button>
            <Button 
              variant={filter === "past" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("past")}
            >
              Past
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!filteredAppointments || filteredAppointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40">
            <p className="text-muted-foreground">No appointments found</p>
            <Button variant="outline" className="mt-4">
              Book an Appointment
            </Button>
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
                {filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          Dr.{" "}
                          {`${appointment.Doctor?.first_name || ""} ${appointment.Doctor?.last_name || ""}`}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.Doctor?.specialty || "Specialist"}
                        </p>
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
                        {format(
                          new Date(
                            `2000-01-01T${appointment.appointment_time}`
                          ),
                          "p"
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => console.log("View details", appointment.id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          
                          {appointment.status === "pending" && new Date(appointment.appointment_date) > new Date() && (
                            <>
                              <DropdownMenuItem onClick={() => console.log("Reschedule", appointment.id)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Reschedule
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => console.log("Cancel", appointment.id)}
                                className="text-red-500 hover:text-red-700 focus:text-red-700"
                              >
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
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
