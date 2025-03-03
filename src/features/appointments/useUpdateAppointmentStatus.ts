
import { updateAppointmentStatus } from "@/api/appointments";
import { AppointmentStatusProps } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useUpdateAppointmentStatus() {
  const queryClient = useQueryClient();
  
  const { isPending, mutate: updateStatusMutation } = useMutation({
    mutationFn: ({ id, data }: { id: number | string, data: AppointmentStatusProps }) => 
      updateAppointmentStatus(id, data),
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update appointment status");
    },
    onSuccess: (_, variables) => {
      toast.success("Appointment status updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["appointment", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["patient-appointments"] });
      queryClient.invalidateQueries({ queryKey: ["doctor-appointments"] });
    },
  });

  return { isPending, updateStatusMutation };
}

export default useUpdateAppointmentStatus;
