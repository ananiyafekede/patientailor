
import { resetPassword } from "@/api/auth";
import { ResetPasswordProps } from "@/types";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useResetPassword() {
  const navigate = useNavigate();
  const { isPending, mutate: resetPasswordMutation } = useMutation({
    mutationFn: (data: ResetPasswordProps) => resetPassword(data),
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data.message || "Password reset successfully!");
      navigate("/login");
    },
  });

  return { isPending, resetPasswordMutation };
}

export default useResetPassword;
