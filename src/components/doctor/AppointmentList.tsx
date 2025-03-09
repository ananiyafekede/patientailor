
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetDoctorAppointment } from "@/hooks/doctor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { format } from "date-fns";
import { Check, File } from "lucide-react";
import PrescriptionForm from "./PrescriptionForm";
import { useUpdateAppointmentStatus } from "@/hooks/appointment";
import { useQueryParams } from "@/hooks/useQueryParams";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DataTableWithFilters } from "@/components/ui/data-table/DataTableWithFilters";

const AppointmentList = () => {
  const { queryParams, setQueryParams, getFilteredQueryParams } =
    useQueryParams({
      page: 1,
      limit: 10,
      sort: "appointment_date",
      _tab: "appointments",
      _appointment_view: "all",
    });

  // Get appointment view from URL
  const appointmentView = queryParams._appointment_view || "all";

  // Add filter based on view
  const apiQueryParams = getFilteredQueryParams();
  if (appointmentView === "upcoming") {
    apiQueryParams.status = "pending";
  } else if (appointmentView === "completed") {
    apiQueryParams.status = "completed";
  }

  const {
    appointments = [],
    isLoading,
    error,
    pagination,
    refetch,
  } = useGetDoctorAppointment(apiQueryParams);

  const { mutate: updateStatus, isPending: isUpdatingStatus } =
    useUpdateAppointmentStatus();

  // Handle view change
  const handleViewChange = (view: string) => {
    setQueryParams({ _appointment_view: view, page: 1 });
  };

  // Handle updating appointment status
  const handleStatusChange = (appointmentId: number, status: string) => {
    updateStatus(
      { id: appointmentId, status },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  // Format date for better display
  const formatDate = (date?: string) => {
    if (!date) return "N/A";
    try {
      return format(new Date(date), "PPP");
    } catch {
      return "Invalid date";
    }
  };

  // Define columns for DataTable
  const columns = [
    {
      key: "appointment_date",
      label: "Date",
      sortable: true,
      render: (appointment: any) => formatDate(appointment.appointment_date),
    },
    {
      key: "appointment_time",
      label: "Time",
      sortable: true,
    },
    {
      key: "patient",
      label: "Patient",
      sortable: false,
      render: (appointment: any) =>
        appointment.patient
          ? `${appointment.patient.first_name} ${appointment.patient.last_name}`
          : "N/A",
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      filterable: true,
      filterOptions: [
        { label: "Pending", value: "pending" },
        { label: "Confirmed", value: "confirmed" },
        { label: "Completed", value: "completed" },
        { label: "Cancelled", value: "cancelled" },
      ],
      render: (appointment: any) => (
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
      ),
    },
    {
      key: "notes",
      label: "Notes",
      sortable: false,
      render: (appointment: any) => (
        <span className="line-clamp-1 max-w-[200px]">
          {appointment.notes || "No notes"}
        </span>
      ),
    },
  ];

  // Define actions
  const actions = [
    {
      label: "Mark as Completed",
      icon: <Check className="h-4 w-4" />,
      onClick: (appointment: any) => {
        if (appointment.status !== "completed") {
          handleStatusChange(appointment.id, "completed");
        }
      },
      condition: (appointment: any) => appointment.status !== "completed",
    },
    {
      label: "Add Prescription",
      icon: <File className="h-4 w-4" />,
      onClick: (appointment: any) => {
        // This will be handled separately through PrescriptionForm
      },
      render: (appointment: any) => (
        <PrescriptionForm
          appointmentId={appointment.id}
          patientId={appointment.patient_id}
        />
      ),
    },
  ];

  // Handle data table query changes
  const handleQueryChange = (newParams: Record<string, any>) => {
    setQueryParams(newParams);
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load appointments</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          variant={appointmentView === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => handleViewChange("all")}
        >
          All
        </Button>
        <Button
          variant={appointmentView === "upcoming" ? "default" : "outline"}
          size="sm"
          onClick={() => handleViewChange("upcoming")}
        >
          Upcoming
        </Button>
        <Button
          variant={appointmentView === "completed" ? "default" : "outline"}
          size="sm"
          onClick={() => handleViewChange("completed")}
        >
          Completed
        </Button>
      </div>

      <DataTableWithFilters
        title="Appointments"
        data={appointments}
        columns={columns}
        actions={actions}
        isLoading={isLoading}
        pagination={pagination || { page: 1, limit: 10, total: 0, totalPages: 0 }}
        searchFields={["notes", "patient.first_name", "patient.last_name"]}
        onQueryChange={handleQueryChange}
      />
    </div>
  );
};

export default AppointmentList;
