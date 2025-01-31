import { getNotifications } from "@/api/notifications";
import { useQuery } from "@tanstack/react-query";

function useGetNotifications() {
  const { isLoading, data: notifications } = useQuery({
    queryKey: ["appointments"],
    queryFn: getNotifications,
  });

  return { isLoading, notifications };
}

export default useGetNotifications;
