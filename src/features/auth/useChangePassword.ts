
import { changePassword } from "@/api/auth";
import { ChangePasswordProps } from "@/types";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useChangePassword() {
  const { isPending, mutate: changePasswordMutation } = useMutation({
    mutationFn: (data: ChangePasswordProps) => changePassword(data),
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data.message || "Password changed successfully!");
    },
  });

  return { isPending, changePasswordMutation };
}

export default useChangePassword;
