
import { updatePatient } from "@/api/patient";
import { UpdatePatientProps } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useUpdatePatient(id: number | string) {
  const queryClient = useQueryClient();
  
  const { isPending, mutate: updatePatientMutation } = useMutation({
    mutationFn: (data: UpdatePatientProps) => updatePatient(id, data),
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update patient");
    },
    onSuccess: () => {
      toast.success("Patient updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["patient", id] });
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });

  return { isPending, updatePatientMutation };
}

export default useUpdatePatient;
