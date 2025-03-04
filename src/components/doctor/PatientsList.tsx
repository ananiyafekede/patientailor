/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from "react";
import { useGetDoctorPatients } from "@/hooks/doctor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { User } from "lucide-react";
import { DataTableWithFilters } from "@/components/ui/data-table/DataTableWithFilters";
import { useQueryParams } from "@/hooks/useQueryParams";

const PatientsList = () => {
  const { queryParams, setQueryParams } = useQueryParams({
    page: 1,
    limit: 10,
    sort: "first_name",
  });

  const {
    patients = [],
    isLoading,
    error,
    pagination,
    refetch,
  } = useGetDoctorPatients(queryParams);

  // Helper functions for patient data display
  const formatDate = (date: string) => {
    if (!date) return "N/A";
    try {
      return format(new Date(date), "PPP");
    } catch (e) {
      return "Invalid date";
    }
  };

  // Define columns for the data table
  const columns = [
    {
      key: "first_name",
      label: "First Name",
      sortable: true,
    },
    {
      key: "last_name",
      label: "Last Name",
      sortable: true,
    },
    {
      key: "date_of_birth",
      label: "Date of Birth",
      sortable: true,
      render: (patient: any) => formatDate(patient.date_of_birth),
    },
    {
      key: "address",
      label: "Address",
      sortable: false,
    },
  ];

  // Define actions for each patient row
  const actions = [
    {
      label: "View Details",
      icon: <User className="h-4 w-4" />,
      onClick: (patient: any) => {
        // Handle viewing patient details
        console.log("View patient details", patient);
      },
    },
  ];

  // Handle query parameter changes
  const handleQueryChange = (newParams: Record<string, any>) => {
    // This will trigger the useGetDoctorPatients hook to refetch with new params
    refetch();
  };

  useEffect(() => {
    if (error) {
      toast.error("Failed to load patients");
      console.error(error);
    }
  }, [error]);

  // If using the card display instead of the table
  const renderPatientCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {patients.map((patient) => (
        <Card key={patient.user_id} className="overflow-hidden">
          <CardHeader className="bg-primary/5 pb-2">
            <CardTitle className="text-lg flex items-center">
              <User className="h-5 w-5 mr-2 text-primary" />
              {patient.first_name} {patient.last_name}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-1">
                <div className="text-sm text-muted-foreground">
                  Date of Birth:
                </div>
                <div className="text-sm">
                  {formatDate(patient.date_of_birth)}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div className="text-sm text-muted-foreground">Address:</div>
                <div className="text-sm">{patient.address || "N/A"}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <DataTableWithFilters
        title="Patients"
        data={patients}
        columns={columns}
        actions={actions}
        isLoading={isLoading}
        pagination={pagination}
        searchFields={["first_name", "last_name", "email"]}
        onQueryChange={handleQueryChange}
      />
    </div>
  );
};

export default PatientsList;
