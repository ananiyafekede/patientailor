
import { deletePatient } from "@/api/patient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useDeletePatient() {
  const queryClient = useQueryClient();
  
  const { isPending, mutate: deletePatientMutation } = useMutation({
    mutationFn: (id: number | string) => deletePatient(id),
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete patient");
    },
    onSuccess: () => {
      toast.success("Patient deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });

  return { isPending, deletePatientMutation };
}

export default useDeletePatient;
