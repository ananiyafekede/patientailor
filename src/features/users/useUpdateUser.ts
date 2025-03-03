
import { updateUser } from "@/api/users";
import { UpdateUserProps } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useUpdateUser(id: number | string) {
  const queryClient = useQueryClient();
  
  const { isPending, mutate: updateUserMutation } = useMutation({
    mutationFn: (data: UpdateUserProps) => updateUser(id, data),
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("User updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["user", id] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return { isPending, updateUserMutation };
}

export default useUpdateUser;
