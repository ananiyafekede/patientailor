
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDoctorAppointments } from "@/api/doctor";
import { Pagination } from "@/types";
import { useQuery } from "@tanstack/react-query";

function useGetDoctorAppointment(queryParams?: Record<string, any>) {
  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["doctor-appointments", queryParams],
    queryFn: () => getDoctorAppointments(queryParams),
    placeholderData: (previousData) => previousData, // This replaces keepPreviousData
  });

  // Ensure pagination has default values if not available
  const defaultPagination: Pagination = {
    total: 0,
    limit: queryParams?.limit || 10,
    page: queryParams?.page || 1,
    totalPages: 0
  };

  return {
    isLoading,
    appointments: data?.appointments || [],
    pagination: data?.pagination || defaultPagination,
    error,
    refetch,
  };
}

export default useGetDoctorAppointment;
