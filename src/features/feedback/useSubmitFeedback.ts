
import { submitFeedback } from "@/api/feedback";
import { FeedbackProps } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useSubmitFeedback() {
  const queryClient = useQueryClient();
  
  const { isPending, mutate: submitFeedbackMutation } = useMutation({
    mutationFn: (data: FeedbackProps) => submitFeedback(data),
    onError: (error: Error) => {
      toast.error(error.message || "Failed to submit feedback");
    },
    onSuccess: () => {
      toast.success("Feedback submitted successfully!");
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
    },
  });

  return { isPending, submitFeedbackMutation };
}

export default useSubmitFeedback;
