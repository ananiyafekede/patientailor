
import { bookPatientAppointments } from "@/api/patient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useBookAppointment() {
  const queryClient = useQueryClient();
  
  const { isPending, mutate: bookAppointment } = useMutation({
    mutationFn: bookPatientAppointments,
    mutationKey: ["book-appointment"],
    onError: (error) => {
      toast.error(error.message || "Failed to book appointment");
    },
    onSuccess: () => {
      toast.success("Appointment booked successfully!");
      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["patient-appointments"] });
    },
  });

  return { bookAppointment, isPending };
}

export default useBookAppointment;
