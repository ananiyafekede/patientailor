
import { forgotPassword } from "@/api/auth";
import { ForgotPasswordProps } from "@/types";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useForgotPassword() {
  const { isPending, mutate: sendForgotPasswordEmail } = useMutation({
    mutationFn: (data: ForgotPasswordProps) => forgotPassword(data),
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data.message || "Password reset link sent to your email!");
    },
  });

  return { isPending, sendForgotPasswordEmail };
}

export default useForgotPassword;
