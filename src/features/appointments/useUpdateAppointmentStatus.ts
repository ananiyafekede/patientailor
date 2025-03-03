
import { updateAppointmentStatus } from "@/api/appointments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface UpdateStatusProps {
  id: number;
  status: string;
}

function useUpdateAppointmentStatus() {
  const queryClient = useQueryClient();
  
  const { isPending, mutate: updateStatusMutation } = useMutation({
    mutationFn: ({ id, status }: UpdateStatusProps) => updateAppointmentStatus(id, status),
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update appointment status");
    },
    onSuccess: () => {
      toast.success("Appointment status updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["doctor-appointments"] });
    },
  });

  return { isPending, updateStatusMutation };
}

export default useUpdateAppointmentStatus;
