
import { getDoctorById } from "@/api/doctor";
import { useQuery } from "@tanstack/react-query";

function useGetDoctorById(id: number | string | undefined) {
  const { isLoading, data: doctor, error } = useQuery({
    queryKey: ["doctor", id],
    queryFn: () => getDoctorById(id as string | number),
    enabled: !!id,
  });

  return { isLoading, doctor, error };
}

export default useGetDoctorById;
