import { register } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useRegister() {
  const navigate = useNavigate();
  const { isPending, mutate: signup } = useMutation({
    mutationFn: register,
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("registered successfully");
      navigate("/login");
    },
  });
  return { isPending, signup };
}

export default useRegister;
