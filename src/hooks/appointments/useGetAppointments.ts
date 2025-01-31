import { getAppointments } from "@/api/appointments";
import { useQuery } from "@tanstack/react-query";

function useGetAppointments() {
  const { isLoading, data: appointments } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });

  return { isLoading, appointments };
}

export default useGetAppointments;
