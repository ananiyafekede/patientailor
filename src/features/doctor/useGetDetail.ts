
import { getDetail } from "@/api/doctor";
import { useQuery } from "@tanstack/react-query";

export function useGetDetail() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["doctor-detail"],
    queryFn: getDetail,
  });

  return {
    isLoading,
    detail: data?.detail || {},
    error,
  };
}
