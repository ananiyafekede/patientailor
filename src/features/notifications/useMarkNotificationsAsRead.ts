
import { markNotificationsAsRead } from "@/api/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useMarkNotificationsAsRead() {
  const queryClient = useQueryClient();
  
  const { isPending, mutate: markAsReadMutation } = useMutation({
    mutationFn: markNotificationsAsRead,
    onError: (error: Error) => {
      toast.error(error.message || "Failed to mark notifications as read");
    },
    onSuccess: () => {
      toast.success("Notifications marked as read!");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  return { isPending, markAsReadMutation };
}

export default useMarkNotificationsAsRead;
