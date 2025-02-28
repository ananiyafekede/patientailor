import { getAppointments } from "@/api/appointments";
import { useQuery } from "@tanstack/react-query";

function useGetAppointments() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });

  return {
    isLoading,
    appointments: data?.appointments || [],
    pagination: data?.pagination || {},
    error,
  };
}

export default useGetAppointments;
