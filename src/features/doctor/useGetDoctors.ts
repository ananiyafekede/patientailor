import { getDoctors } from "@/api/doctor";
import { useQuery } from "@tanstack/react-query";

function useGetDoctors() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });

  return {
    isLoading,
    error,
    doctors: data?.doctors,
    pagination: data?.pagination,
  };
}

export default useGetDoctors;
