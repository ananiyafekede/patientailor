
import { getFeedback } from "@/api/feedback";
import { useQuery } from "@tanstack/react-query";

function useGetFeedback(queryParams?: Record<string, any>) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["feedback", queryParams],
    queryFn: () => getFeedback(queryParams),
  });

  return {
    isLoading,
    feedback: data?.feedback || [],
    pagination: data?.pagination,
    error,
  };
}

export default useGetFeedback;
