
import { sendNotification } from "@/api/notifications";
import { NotificationProps } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useSendNotification() {
  const queryClient = useQueryClient();
  
  const { isPending, mutate: sendNotificationMutation } = useMutation({
    mutationFn: (data: NotificationProps) => sendNotification(data),
    onError: (error: Error) => {
      toast.error(error.message || "Failed to send notification");
    },
    onSuccess: () => {
      toast.success("Notification sent successfully!");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  return { isPending, sendNotificationMutation };
}

export default useSendNotification;
