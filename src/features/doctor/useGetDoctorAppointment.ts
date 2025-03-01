import { getDoctorAppointments } from "@/api/doctor";
import { useQuery } from "@tanstack/react-query";

function useGetDoctorAppointment() {
  const { isLoading, data, error } = useQuery({
    queryFn: getDoctorAppointments,
    queryKey: ["doctor-appointments"],
  });

  return {
    isLoading,
    doctorAppointments: data.appointments,
    pagination: data.pagination,
    error,
  };
}

export default useGetDoctorAppointment;
