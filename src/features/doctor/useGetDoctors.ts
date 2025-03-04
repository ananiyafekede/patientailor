
/* eslint-disable @typescript-eslint/no-explicit-any */

import { getDoctors } from "@/api/doctor";
import { useQuery } from "@tanstack/react-query";

function useGetDoctors(queryParams?: Record<string, any>) {
  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["doctors", queryParams],
    queryFn: () => getDoctors(queryParams),
    keepPreviousData: true, // Keep previous data while loading new data
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
