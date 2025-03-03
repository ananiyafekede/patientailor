
import { updateDoctor } from "@/api/doctor";
import { UpdateDoctorProps } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useUpdateDoctor(id: number | string) {
  const queryClient = useQueryClient();
  
  const { isPending, mutate: updateDoctorMutation } = useMutation({
    mutationFn: (data: UpdateDoctorProps) => updateDoctor(id, data),
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update doctor");
    },
    onSuccess: () => {
      toast.success("Doctor updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["doctor", id] });
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });

  return { isPending, updateDoctorMutation };
}

export default useUpdateDoctor;
