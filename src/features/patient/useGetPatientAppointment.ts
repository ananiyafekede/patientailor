
import { getPatientAppointments } from "@/api/patient";
import { useQuery } from "@tanstack/react-query";

function useGetPatientAppointments(id?: number | string, queryParams?: Record<string, any>) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["patient-appointments", id, queryParams],
    queryFn: () => getPatientAppointments(id, queryParams),
  });

  return {
    isLoading,
    appointments: data?.appointments || [],
    pagination: data?.pagination || {},
    error,
  };
}

export default useGetPatientAppointments;
