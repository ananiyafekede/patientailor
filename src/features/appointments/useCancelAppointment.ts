
import { cancelAppointment } from "@/api/appointments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useCancelAppointment() {
  const queryClient = useQueryClient();
  
  const { isPending, mutate: cancelAppointmentMutation } = useMutation({
    mutationFn: (id: number | string) => cancelAppointment(id),
    onError: (error: Error) => {
      toast.error(error.message || "Failed to cancel appointment");
    },
    onSuccess: () => {
      toast.success("Appointment cancelled successfully!");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["patient-appointments"] });
      queryClient.invalidateQueries({ queryKey: ["doctor-appointments"] });
    },
  });

  return { isPending, cancelAppointmentMutation };
}

export default useCancelAppointment;
