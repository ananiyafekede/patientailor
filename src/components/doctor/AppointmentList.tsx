
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useCallback } from "react";
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
import { Appointment } from "@/types";

const AppointmentList = () => {
  const { queryParams, setQueryParams, getFilteredQueryParams } =
    useQueryParams({
      page: 1,
      limit: 10,
      sort: "appointment_date",
    });

  // Only set the tab once when component mounts to avoid infinite loop
  useEffect(() => {
    // Only update if the current tab isn't already set to appointments
    if (queryParams._tab !== "appointments") {
      setQueryParams({
        _tab: "appointments",
        // Default appointment view if none is specified
        _appointment_view: queryParams._appointment_view || "all",
      });
    }
  }, []); // Empty dependency array ensures this only runs once on mount

  // Get appointment view from URL
  const appointmentView = queryParams._appointment_view || "all";

  // Add filter based on view - but don't trigger another state update
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

  // Handle view change without triggering an infinite loop
  const handleViewChange = useCallback((view: string) => {
    if (view !== appointmentView) {
      setQueryParams({ _appointment_view: view, page: 1 });
    }
  }, [appointmentView, setQueryParams]);

  // Handle updating appointment status
  const handleStatusChange = useCallback((appointmentId: number, status: string) => {
    updateStatus(
      { id: appointmentId, status },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  }, [updateStatus, refetch]);

  // Format date for better display
  const formatDate = useCallback((date?: string) => {
    if (!date) return "N/A";
    try {
      return format(new Date(date), "PPP");
    } catch {
      return "Invalid date";
    }
  }, []);

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
      sortable: true, // Changed to true to enable sorting
      render: (appointment: Appointment) => {
        return appointment.Patient
          ? `${appointment.Patient.first_name} ${appointment.Patient.last_name}`
          : "N/A";
      },
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
  const handleQueryChange = useCallback((newParams: Record<string, any>) => {
    // Prevent infinite loop by not triggering a state update if nothing changed
    const hasChanges = Object.entries(newParams).some(
      ([key, value]) => queryParams[key] !== value
    );

    if (hasChanges) {
      setQueryParams(newParams);
    }
  }, [queryParams, setQueryParams]);

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
        pagination={
          pagination || { page: 1, limit: 10, total: 0, totalPages: 0 }
        }
        searchFields={["notes"]}
        onQueryChange={handleQueryChange}
      />
    </div>
  );
};

export default AppointmentList;
