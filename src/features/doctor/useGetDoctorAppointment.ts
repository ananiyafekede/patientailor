import { getDoctorAppointments } from "@/api/doctor";
import { useQuery } from "@tanstack/react-query";

function useGetDoctorAppointment(id: string) {
  const { isLoading, data: doctorAppointments } = useQuery({
    queryFn: () => getDoctorAppointments(id),
    queryKey: ["doctor-appointments"],
  });

  return { isLoading, doctorAppointments };
}

export default useGetDoctorAppointment;
