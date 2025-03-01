import { bookPatientAppointments } from "@/api/patient";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useBookAppointment() {
  const { isPending, mutate: bookAppointment } = useMutation({
    mutationFn: bookPatientAppointments,
    mutationKey: ["book-appointment"],
    onError: () => {
      toast.error("error");
    },
    onSuccess: () => {
      toast.success("success");
    },
  });

  return { bookAppointment, isPending };
}

export default useBookAppointment;
