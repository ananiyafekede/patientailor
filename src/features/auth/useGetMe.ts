
import { getMe } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";

function useGetMe() {
  const { isLoading, data: user, error } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  return { isLoading, user, error };
}

export default useGetMe;
