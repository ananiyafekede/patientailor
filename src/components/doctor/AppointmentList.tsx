/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import { useGetDoctorAppointment } from "@/hooks/doctor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { format } from "date-fns";
import { Calendar, Check, Clock, User } from "lucide-react";
import PrescriptionForm from "./PrescriptionForm";
import { useUpdateAppointmentStatus } from "@/hooks/appointment";
import { useQueryParams } from "@/hooks/useQueryParams";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AppointmentList = () => {
  const [filter, setFilter] = useState<"upcoming" | "all" | "completed">(
    "upcoming"
  );
  const { queryParams, setQueryParams, getFilteredQueryParams } =
    useQueryParams({
      page: 1,
      limit: 1,
      sort: "appointment_date",
      _tab: "appointments",
    });
  const {
    appointments = [],
    isLoading,
    error,
    pagination,
    refetch,
  } = useGetDoctorAppointment(getFilteredQueryParams());

  const { mutate: updateStatus, isPending: isUpdatingStatus } =
    useUpdateAppointmentStatus();

  useEffect(() => {
    setQueryParams({ _tab: "appointments" });
  }, []);
  useEffect(() => {
    if (appointments?.length) {
      let filtered = [...appointments];

      if (filter === "upcoming") {
        filtered = appointments.filter((app) => app.status !== "completed");
      } else if (filter === "completed") {
        filtered = appointments.filter((app) => app.status === "completed");
      } else {
        filtered = [...appointments];
      }

      // Sort by date (most recent first)
      filtered.sort((a, b) => {
        return (
          new Date(b.appointment_date).getTime() -
          new Date(a.appointment_date).getTime()
        );
      });

      setFilteredAppointments(filtered);
    }
  }, [appointments, filter]);

  const [filteredAppointments, setFilteredAppointments] = useState<any[]>([]);

  const handleStatusChange = (appointmentId: number, status: string) => {
    updateStatus({ id: appointmentId, status });
  };

  const handlePageChange = (newPage: number) => {
    setQueryParams({ page: newPage });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner />
      </div>
    );
  }

  if (!appointments?.length) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <p className="text-muted-foreground">No appointments found</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          variant={filter === "upcoming" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("upcoming")}
        >
          Upcoming
        </Button>
        <Button
          variant={filter === "completed" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("completed")}
        >
          Completed
        </Button>
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          All
        </Button>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Failed to load appointments</AlertDescription>
          </Alert>
        ) : (
          <>
            {filteredAppointments.map((appointment) => (
              <Card key={appointment.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
                    <div className="flex flex-col space-y-1">
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Date
                      </div>
                      <div>
                        {format(new Date(appointment.appointment_date), "PPP")}
                      </div>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Time
                      </div>
                      <div>{appointment.appointment_time}</div>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <div className="text-sm text-muted-foreground flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        Patient
                      </div>
                      <div>
                        {appointment.patient?.first_name}{" "}
                        {appointment.patient?.last_name}
                      </div>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <div className="text-sm text-muted-foreground">
                        Status
                      </div>
                      <Badge
                        className="w-fit"
                        variant={
                          appointment.status === "completed"
                            ? "default"
                            : appointment.status === "cancelled"
                            ? "destructive"
                            : "outline"
                        }
                      >
                        {appointment.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      {appointment.notes && (
                        <p className="text-sm text-muted-foreground">
                          {appointment.notes}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {appointment.status !== "completed" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleStatusChange(appointment.id, "completed")
                          }
                          disabled={isUpdatingStatus}
                          className="flex items-center gap-2"
                        >
                          <Check className="h-4 w-4" />
                          Mark as Completed
                        </Button>
                      )}

                      <PrescriptionForm
                        appointmentId={appointment.id}
                        patientId={appointment.patient_id}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-between pt-4">
                <div className="text-sm text-muted-foreground">
                  Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                  {Math.min(
                    pagination.page * pagination.limit,
                    pagination.total
                  )}{" "}
                  of {pagination.total} appointments
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page <= 1 || isLoading}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={
                      pagination.page >= pagination.totalPages || isLoading
                    }
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AppointmentList;
