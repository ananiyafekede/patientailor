
import { deleteNotification } from "@/api/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useDeleteNotification() {
  const queryClient = useQueryClient();
  
  const { isPending, mutate: deleteNotificationMutation } = useMutation({
    mutationFn: (id: number | string) => deleteNotification(id),
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete notification");
    },
    onSuccess: () => {
      toast.success("Notification deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  return { isPending, deleteNotificationMutation };
}

export default useDeleteNotification;
