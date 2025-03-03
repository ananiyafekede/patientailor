
import { bookAppointment } from "@/api/appointments";
import { BookAppointmentProps } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useBookAppointment() {
  const queryClient = useQueryClient();
  
  const { isPending, mutate: bookAppointmentMutation } = useMutation({
    mutationFn: (data: BookAppointmentProps) => bookAppointment(data),
    onError: (error: Error) => {
      toast.error(error.message || "Failed to book appointment");
    },
    onSuccess: () => {
      toast.success("Appointment booked successfully!");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["patient-appointments"] });
    },
  });

  return { isPending, bookAppointmentMutation };
}

export default useBookAppointment;
