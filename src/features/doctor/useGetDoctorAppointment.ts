
import { getDoctorAppointments } from "@/api/doctor";
import { useQuery } from "@tanstack/react-query";

function useGetDoctorAppointment(queryParams?: Record<string, any>) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["doctor-appointments", queryParams],
    queryFn: () => getDoctorAppointments(queryParams),
  });

  return {
    isLoading,
    appointments: data?.appointments || [],
    pagination: data?.pagination,
    error,
  };
}

export default useGetDoctorAppointment;
