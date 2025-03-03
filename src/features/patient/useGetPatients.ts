
import { getPatients } from "@/api/patient";
import { useQuery } from "@tanstack/react-query";

function useGetPatients(queryParams?: Record<string, any>) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["patients", queryParams],
    queryFn: () => getPatients(queryParams),
  });

  return {
    isLoading,
    patients: data?.patients || [],
    pagination: data?.pagination,
    error,
  };
}

export default useGetPatients;
