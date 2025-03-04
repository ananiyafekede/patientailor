/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDoctorPatients } from "@/api/doctor";
import { useQuery } from "@tanstack/react-query";

function useGetDoctorPatients(queryParams?: Record<string, any>) {
  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["doctor-patients", queryParams],
    queryFn: () => getDoctorPatients(queryParams),
  });

  return {
    isLoading,
    patients: data?.patients || [],
    pagination: data?.pagination,
    error,
    refetch,
  };
}

export default useGetDoctorPatients;
