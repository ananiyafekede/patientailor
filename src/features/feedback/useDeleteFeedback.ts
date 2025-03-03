
import { deleteFeedback } from "@/api/feedback";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useDeleteFeedback() {
  const queryClient = useQueryClient();
  
  const { isPending, mutate: deleteFeedbackMutation } = useMutation({
    mutationFn: (id: number | string) => deleteFeedback(id),
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete feedback");
    },
    onSuccess: () => {
      toast.success("Feedback deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
    },
  });

  return { isPending, deleteFeedbackMutation };
}

export default useDeleteFeedback;
