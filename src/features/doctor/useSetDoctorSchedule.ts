
import { setDoctorSchedule } from "@/api/doctor";
import { ScheduleProps } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useSetDoctorSchedule() {
  const queryClient = useQueryClient();
  
  const { isPending, mutate: setScheduleMutation } = useMutation({
    mutationFn: (data: ScheduleProps) => setDoctorSchedule(data),
    onError: (error: Error) => {
      toast.error(error.message || "Failed to set schedule");
    },
    onSuccess: () => {
      toast.success("Schedule set successfully!");
      queryClient.invalidateQueries({ queryKey: ["doctor-schedule"] });
    },
  });

  return { isPending, setScheduleMutation };
}

export default useSetDoctorSchedule;
