
import { getScheduleForDoctor } from "@/api/schedule";
import { useQuery } from "@tanstack/react-query";

function useGetScheduleForDoctor(
  doctorId: string | number,
  selectedDate: Date | undefined
) {
  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["available-slots", doctorId, selectedDate],
    queryFn: () => getScheduleForDoctor(doctorId),
    enabled: !!doctorId && !!selectedDate,
  });

  return {
    isLoading,
    schedules: data?.schedules || [],
    pagination: data?.pagination,
    error,
    refetch,
  };
}

export default useGetScheduleForDoctor;
