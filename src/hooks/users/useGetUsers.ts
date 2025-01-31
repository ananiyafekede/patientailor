import { getUsers } from "@/api/users";
import { useQuery } from "@tanstack/react-query";

function useGetUsers() {
  const { isLoading, data: users } = useQuery({
    queryKey: ["appointments"],
    queryFn: getUsers,
  });

  return { isLoading, users };
}

export default useGetUsers;
