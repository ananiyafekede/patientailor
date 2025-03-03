
import { deleteReport } from "@/api/reports";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useDeleteReport() {
  const queryClient = useQueryClient();
  
  const { isPending, mutate: deleteReportMutation } = useMutation({
    mutationFn: (id: number | string) => deleteReport(id),
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete report");
    },
    onSuccess: () => {
      toast.success("Report deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
  });

  return { isPending, deleteReportMutation };
}

export default useDeleteReport;
