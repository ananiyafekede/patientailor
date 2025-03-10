
import { useEffect, useState, useCallback } from "react";
import { format } from "date-fns";
import { Calendar, Clock, Eye, Edit, X, MoreVertical } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useGetPatientAppointments } from "@/hooks/patient";
import { useNavigate } from "react-router-dom";
import { useQueryParams } from "@/hooks/useQueryParams";
import { Appointment } from "@/types";
import { DataTableWithFilters } from "@/components/ui/data-table/DataTableWithFilters";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const AppointmentList = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all"); // all, upcoming, past
  
  const { queryParams, setQueryParams, getFilteredQueryParams } = useQueryParams({
    page: 1,
    limit: 10,
    sort: "appointment_date",
    order: "desc"
  });
  
  const apiQueryParams = getFilteredQueryParams();
  // Apply manual filtering for appointment status based on dates
  if (filter === "upcoming") {
    apiQueryParams.status = "pending";
  } else if (filter === "past") {
    apiQueryParams.status = "completed,cancelled";
  }
  
  const { isLoading, error, appointments, pagination } = useGetPatientAppointments(undefined, apiQueryParams);

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
  
  const handleFilterChange = useCallback((newFilter: string) => {
    setFilter(newFilter);
    // Reset to first page when changing filters
    setQueryParams({ page: 1 });
  }, [setQueryParams]);
  
  const handleQueryChange = useCallback((newParams: Record<string, any>) => {
    setQueryParams(newParams);
  }, [setQueryParams]);

  const formatDate = useCallback((date: string) => {
    try {
      return format(new Date(date), "PPP");
    } catch {
      return "Invalid date";
    }
  }, []);
  
  const formatTime = useCallback((time: string) => {
    try {
      return format(new Date(`2000-01-01T${time}`), "p");
    } catch {
      return time;
    }
  }, []);

  // Define columns for DataTable
  const columns = [
    {
      key: "Doctor",
      label: "Doctor",
      sortable: false,
      render: (appointment: Appointment) => (
        <div>
          <p className="font-medium">
            Dr.{" "}
            {`${appointment.Doctor?.first_name || ""} ${appointment.Doctor?.last_name || ""}`}
          </p>
          <p className="text-sm text-muted-foreground">
            {appointment.Doctor?.specialty || "Specialist"}
          </p>
        </div>
      ),
    },
    {
      key: "appointment_date",
      label: "Date",
      sortable: true,
      render: (appointment: Appointment) => (
        <div className="flex items-center">
          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
          {formatDate(appointment.appointment_date)}
        </div>
      ),
    },
    {
      key: "appointment_time",
      label: "Time",
      sortable: true,
      render: (appointment: Appointment) => (
        <div className="flex items-center">
          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
          {formatTime(appointment.appointment_time)}
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      filterable: true,
      filterOptions: [
        { label: "Pending", value: "pending" },
        { label: "Completed", value: "completed" },
        { label: "Cancelled", value: "cancelled" },
      ],
      render: (appointment: Appointment) => (
        <Badge className={getStatusColor(appointment.status)}>
          {appointment.status}
        </Badge>
      ),
    }
  ];

  // Define actions
  const actions = [
    {
      label: "View Details",
      icon: <Eye className="h-4 w-4" />,
      onClick: (appointment: Appointment) => console.log("View details", appointment.id),
    },
    {
      label: "Reschedule",
      icon: <Edit className="h-4 w-4" />,
      onClick: (appointment: Appointment) => console.log("Reschedule", appointment.id),
      condition: (appointment: Appointment) => 
        appointment.status === "pending" && new Date(appointment.appointment_date) > new Date(),
    },
    {
      label: "Cancel",
      icon: <X className="h-4 w-4" />,
      onClick: (appointment: Appointment) => console.log("Cancel", appointment.id),
      condition: (appointment: Appointment) => 
        appointment.status === "pending" && new Date(appointment.appointment_date) > new Date(),
    }
  ];

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
              onClick={() => handleFilterChange("all")}
            >
              All
            </Button>
            <Button 
              variant={filter === "upcoming" ? "default" : "outline"} 
              size="sm"
              onClick={() => handleFilterChange("upcoming")}
            >
              Upcoming
            </Button>
            <Button 
              variant={filter === "past" ? "default" : "outline"} 
              size="sm"
              onClick={() => handleFilterChange("past")}
            >
              Past
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <DataTableWithFilters
          data={appointments || []}
          columns={columns}
          actions={actions}
          isLoading={isLoading}
          pagination={pagination || { page: 1, limit: 10, total: 0, totalPages: 0 }}
          searchFields={["notes"]}
          onQueryChange={handleQueryChange}
          showSearch={true}
        />
      </CardContent>
    </Card>
  );
};

export default AppointmentList;
