
import { createPrescription } from "@/api/doctor";
import { PrescriptionProps } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useCreatePrescription() {
  const queryClient = useQueryClient();
  
  const { isPending, mutate: createPrescriptionMutation } = useMutation({
    mutationFn: (data: PrescriptionProps) => createPrescription(data),
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create prescription");
    },
    onSuccess: () => {
      toast.success("Prescription created successfully!");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
  });

  return { isPending, createPrescriptionMutation };
}

export default useCreatePrescription;
