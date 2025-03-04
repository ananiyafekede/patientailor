
import { getDoctors } from "@/api/doctor";
import { useQuery } from "@tanstack/react-query";

function useGetDoctors(queryParams?: Record<string, any>) {
  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["doctors", queryParams],
    queryFn: () => getDoctors(queryParams),
    placeholderData: (previousData) => previousData, // This replaces keepPreviousData
  });

  return {
    isLoading,
    doctors: data?.doctors || [],
    pagination: data?.pagination,
    error,
    refetch
  };
}

export default useGetDoctors;
