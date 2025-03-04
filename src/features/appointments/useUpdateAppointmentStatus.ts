
import { updateAppointmentStatus } from "@/api/appointments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

interface UpdateStatusParams {
  id: string | number;
  status: string;
}

function useUpdateAppointmentStatus() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, status }: UpdateStatusParams) =>
      updateAppointmentStatus(id, status),
    onSuccess: () => {
      toast.success("Appointment status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["doctor-appointments"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update appointment status");
    },
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
  };
}

export default useUpdateAppointmentStatus;
