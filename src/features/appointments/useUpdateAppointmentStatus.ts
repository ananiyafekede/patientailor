
import { updateAppointmentStatus } from "@/api/appointments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { AppointmentStatusProps } from "@/types";

function useUpdateAppointmentStatus() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: number | string; status: AppointmentStatusProps }) => 
      updateAppointmentStatus(id, status),
    onSuccess: () => {
      toast.success("Appointment status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["doctor-appointments"] });
      queryClient.invalidateQueries({ queryKey: ["patient-appointments"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update appointment status");
    },
  });

  return mutation;
}

export default useUpdateAppointmentStatus;
