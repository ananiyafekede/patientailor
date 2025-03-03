
import { updateMe } from "@/api/auth";
import { UpdateUserProps, User } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useUpdateMe() {
  const queryClient = useQueryClient();
  
  const { isPending, mutate: updateProfile } = useMutation({
    mutationFn: (data: UpdateUserProps) => updateMe(data),
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: (updatedUser: User) => {
      toast.success("Profile updated successfully!");
      queryClient.setQueryData(["me"], updatedUser);
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });

  return { isPending, updateProfile };
}

export default useUpdateMe;
