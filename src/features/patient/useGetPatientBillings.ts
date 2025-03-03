
import { getPatientBillings } from "@/api/patient";
import { useQuery } from "@tanstack/react-query";

function useGetPatientBillings(id?: number | string, queryParams?: Record<string, any>) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["patient-billings", id, queryParams],
    queryFn: () => getPatientBillings(id, queryParams),
  });

  return {
    isLoading,
    data: data?.billings || [],
    pagination: data?.pagination || {},
    error,
  };
}

export default useGetPatientBillings;
