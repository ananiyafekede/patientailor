
import { activateUser } from "@/api/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useActivateUser() {
  const queryClient = useQueryClient();
  
  const { isPending, mutate: activateUserMutation } = useMutation({
    mutationFn: (id: number | string) => activateUser(id),
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("User activated successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return { isPending, activateUserMutation };
}

export default useActivateUser;
