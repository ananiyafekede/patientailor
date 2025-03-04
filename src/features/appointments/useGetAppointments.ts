
/* eslint-disable @typescript-eslint/no-explicit-any */

import { getAppointments } from "@/api/appointments";
import { useQuery } from "@tanstack/react-query";

function useGetAppointments(queryParams?: Record<string, any>) {
  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["appointments", queryParams],
    queryFn: () => getAppointments(queryParams),
    keepPreviousData: true, // Keep previous data while loading new data
  });

  return {
    isLoading,
    appointments: data?.appointments || [],
    pagination: data?.pagination,
    error,
    refetch
  };
}

export default useGetAppointments;
