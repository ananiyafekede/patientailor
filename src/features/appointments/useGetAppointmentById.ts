
import { getAppointmentById } from "@/api/appointments";
import { useQuery } from "@tanstack/react-query";

function useGetAppointmentById(id: number | string | undefined) {
  const { isLoading, data: appointment, error } = useQuery({
    queryKey: ["appointment", id],
    queryFn: () => getAppointmentById(id as string | number),
    enabled: !!id,
  });

  return { isLoading, appointment, error };
}

export default useGetAppointmentById;
