
import { getAppointments } from "@/api/appointments";
import { useQuery } from "@tanstack/react-query";

function useGetAppointments(queryParams?: Record<string, any>) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["appointments", queryParams],
    queryFn: () => getAppointments(queryParams),
  });

  return {
    isLoading,
    appointments: data?.appointments || [],
    pagination: data?.pagination,
    error,
  };
}

export default useGetAppointments;
