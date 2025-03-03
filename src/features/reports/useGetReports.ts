
import { getReports } from "@/api/reports";
import { useQuery } from "@tanstack/react-query";

function useGetReports(queryParams?: Record<string, any>) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["reports", queryParams],
    queryFn: () => getReports(queryParams),
  });

  return {
    isLoading,
    reports: data?.reports || [],
    pagination: data?.pagination,
    error,
  };
}

export default useGetReports;
