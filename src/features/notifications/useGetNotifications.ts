
import { getNotifications } from "@/api/notifications";
import { useQuery } from "@tanstack/react-query";

function useGetNotifications(queryParams?: Record<string, any>) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["notifications", queryParams],
    queryFn: () => getNotifications(queryParams),
  });

  return {
    isLoading,
    notifications: data?.notifications || [],
    pagination: data?.pagination,
    error,
  };
}

export default useGetNotifications;
