import { login as loginApi } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const navigate = useNavigate();
  const { isPending, mutate: login } = useMutation({
    mutationFn: loginApi,
    onError: () => {
      toast.error("Invalid credentials");
    },
    onSuccess: (data) => {
      toast.success("Successfully logged in!");
      localStorage.setItem("user", JSON.stringify(data));
      switch (data.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "doctor":
          navigate("/doctor/dashboard");
          break;
        case "patient":
          navigate("/patient/dashboard");
          break;
        default:
          navigate("/");
      }
    },
  });

  return { isPending, login };
}

export default useLogin;
