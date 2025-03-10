
import { getPatientReports } from "@/api/patient";
import { useQuery } from "@tanstack/react-query";

function useGetPatientReports(id?: number | string, queryParams?: Record<string, any>) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["patient-reports", id, queryParams],
    queryFn: () => getPatientReports(id, queryParams),
  });

  return {
    isLoading,
    reports: data?.reports || [],
    pagination: data?.pagination || {
      total: 0,
      limit: 10,
      page: 1,
      totalPages: 0
    },
    error,
  };
}

export default useGetPatientReports;
