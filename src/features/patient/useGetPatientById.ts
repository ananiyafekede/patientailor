
import { getPatientById } from "@/api/patient";
import { useQuery } from "@tanstack/react-query";

function useGetPatientById(id: number | string | undefined) {
  const { isLoading, data: patient, error } = useQuery({
    queryKey: ["patient", id],
    queryFn: () => getPatientById(id as string | number),
    enabled: !!id,
  });

  return { isLoading, patient, error };
}

export default useGetPatientById;
