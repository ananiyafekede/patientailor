
import { deleteDoctor } from "@/api/doctor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useDeleteDoctor() {
  const queryClient = useQueryClient();
  
  const { isPending, mutate: deleteDoctorMutation } = useMutation({
    mutationFn: (id: number | string) => deleteDoctor(id),
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete doctor");
    },
    onSuccess: () => {
      toast.success("Doctor deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });

  return { isPending, deleteDoctorMutation };
}

export default useDeleteDoctor;
