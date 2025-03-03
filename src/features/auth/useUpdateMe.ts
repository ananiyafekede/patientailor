
import { updateMe } from "@/api/auth";
import { UpdateUserProps } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useUpdateMe() {
  const queryClient = useQueryClient();
  
  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: (data: UpdateUserProps) => updateMe(data),
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update profile");
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });

  return { updateUser, isPending };
}

export default useUpdateMe;
