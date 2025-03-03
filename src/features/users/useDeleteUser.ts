
import { deleteUser } from "@/api/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useDeleteUser() {
  const queryClient = useQueryClient();
  
  const { isPending, mutate: deleteUserMutation } = useMutation({
    mutationFn: (id: number | string) => deleteUser(id),
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("User deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return { isPending, deleteUserMutation };
}

export default useDeleteUser;
