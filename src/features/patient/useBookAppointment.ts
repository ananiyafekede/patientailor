
import { bookPatientAppointment } from "@/api/patient";
import { BookAppointmentProps } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useBookAppointment() {
  const queryClient = useQueryClient();
  
  const { isPending, mutate: bookAppointment } = useMutation({
    mutationFn: (data: BookAppointmentProps) => bookPatientAppointment(data),
    onError: (error: Error) => {
      toast.error(error.message || "Failed to book appointment");
    },
    onSuccess: () => {
      toast.success("Appointment booked successfully!");
      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["patient-appointments"] });
      queryClient.invalidateQueries({ queryKey: ["available-slots"] });
    },
  });

  return { bookAppointment, isPending };
}

export default useBookAppointment;
