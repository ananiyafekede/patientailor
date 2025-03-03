
import { getDoctors } from "@/api/doctor";
import { useQuery } from "@tanstack/react-query";

function useGetDoctors(queryParams?: Record<string, any>) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["doctors", queryParams],
    queryFn: () => getDoctors(queryParams),
  });

  return {
    isLoading,
    doctors: data?.doctors || [],
    pagination: data?.pagination,
    error,
  };
}

export default useGetDoctors;
