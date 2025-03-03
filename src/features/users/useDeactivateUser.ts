
import { deactivateUser } from "@/api/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useDeactivateUser() {
  const queryClient = useQueryClient();
  
  const { isPending, mutate: deactivateUserMutation } = useMutation({
    mutationFn: (id: number | string) => deactivateUser(id),
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("User deactivated successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return { isPending, deactivateUserMutation };
}

export default useDeactivateUser;
