
import { rescheduleAppointment } from "@/api/appointments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useRescheduleAppointment() {
  const queryClient = useQueryClient();
  
  const { isPending, mutate: rescheduleAppointmentMutation } = useMutation({
    mutationFn: ({ id, data }: { 
      id: number | string, 
      data: { appointment_date: string; appointment_time: string; } 
    }) => rescheduleAppointment(id, data),
    onError: (error: Error) => {
      toast.error(error.message || "Failed to reschedule appointment");
    },
    onSuccess: (_, variables) => {
      toast.success("Appointment rescheduled successfully!");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["appointment", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["patient-appointments"] });
      queryClient.invalidateQueries({ queryKey: ["doctor-appointments"] });
    },
  });

  return { isPending, rescheduleAppointmentMutation };
}

export default useRescheduleAppointment;
