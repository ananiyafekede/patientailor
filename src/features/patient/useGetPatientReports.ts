
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
    pagination: data?.pagination || {},
    error,
  };
}

export default useGetPatientReports;
