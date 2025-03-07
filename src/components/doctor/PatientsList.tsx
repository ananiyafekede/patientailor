/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetDoctorPatients } from "@/hooks/doctor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { User } from "lucide-react";
import { DataTableWithFilters } from "@/components/ui/data-table/DataTableWithFilters";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useEffect } from "react";

const PatientsList = () => {
  const { queryParams, setQueryParams, getFilteredQueryParams } =
    useQueryParams({
      page: 1,
      limit: 10,
      sort: "first_name",
      _tab: "patients",
    });

  const {
    patients = [],
    isLoading,
    error,
    pagination,
    refetch,
  } = useGetDoctorPatients(getFilteredQueryParams());

  useEffect(() => {
    setQueryParams({ _tab: "patients" });
  }, []);

  // Format date for better display
  const formatDate = (date?: string) => {
    if (!date) return "N/A";
    try {
      return format(new Date(date), "PPP");
    } catch {
      return "Invalid date";
    }
  };

  const columns = [
    { key: "first_name", label: "First Name", sortable: true },
    { key: "last_name", label: "Last Name", sortable: true },
    {
      key: "date_of_birth",
      label: "Date of Birth",
      sortable: true,
      render: (patient: any) => formatDate(patient.date_of_birth),
    },
    { key: "address", label: "Address", sortable: false },
  ];

  const actions = [
    {
      label: "View Details",
      icon: <User className="h-4 w-4" />,
      onClick: (patient: any) => console.log("Viewing", patient),
    },
  ];

  const handleQueryChange = (newParams: Record<string, any>) => {
    setQueryParams(newParams);
  };

  return (
    <div className="space-y-4">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading patients</p>
      ) : (
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
      )}
    </div>
  );
};

export default PatientsList;
