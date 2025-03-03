
import { getUsers } from "@/api/users";
import { useQuery } from "@tanstack/react-query";

function useGetUsers(queryParams?: Record<string, any>) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["users", queryParams],
    queryFn: () => getUsers(queryParams),
  });

  return {
    isLoading,
    users: data?.users || [],
    pagination: data?.pagination,
    error,
  };
}

export default useGetUsers;
