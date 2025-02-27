import { login as loginApi } from "@/api/auth";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { isPending, mutate: login } = useMutation({
    mutationFn: loginApi,
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success("Successfully logged in!");
      setUser(data);
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
