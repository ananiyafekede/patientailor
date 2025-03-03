
import { getUserById } from "@/api/users";
import { useQuery } from "@tanstack/react-query";

function useGetUserById(id: number | string | undefined) {
  const { isLoading, data: user, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id as string | number),
    enabled: !!id,
  });

  return { isLoading, user, error };
}

export default useGetUserById;
