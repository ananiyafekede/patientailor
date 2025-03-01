import { getPatientAppointments } from "@/api/patient";
import { useQuery } from "@tanstack/react-query";

function useGetPatientAppointments() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["patient-appointments"],
    queryFn: getPatientAppointments,
  });

  return {
    isLoading,
    appointments: data?.appointments || [],
    pagination: data?.pagination || {},
    error,
  };
}

export default useGetPatientAppointments;
