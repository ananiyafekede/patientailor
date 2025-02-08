import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "@/api/auth";
function useLogout() {
  const navigate = useNavigate();
  const { isPending, mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onError: () => {
      toast.error("Logout Failed");
    },
    onSuccess: (data) => {
      toast.success("Successfully logged out!");
      localStorage.removeItem("user");
      navigate("/login", { replace: true });
    },
  });

  return { isPending, logout };
}

export default useLogout;
