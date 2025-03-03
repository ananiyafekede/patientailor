
import { getDoctorSchedule } from "@/api/doctor";
import { useQuery } from "@tanstack/react-query";

function useGetDoctorSchedule(queryParams?: Record<string, any>) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["doctor-schedule", queryParams],
    queryFn: () => getDoctorSchedule(queryParams),
  });

  return {
    isLoading,
    schedules: data?.schedules || [],
    pagination: data?.pagination,
    error,
  };
}

export default useGetDoctorSchedule;
