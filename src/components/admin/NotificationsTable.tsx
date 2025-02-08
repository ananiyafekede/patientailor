import { Edit2, Eye, Trash2 } from "lucide-react";
import { DataTable } from "@/components/ui/data-table/DataTable";
import { Spinner } from "@/components/ui/spinner";
import toast from "react-hot-toast";
import useGetNotifications from "@/features/notifications/useGetNotifications";
import { Notification } from "@/types";

const NotificationsTable = () => {
  const { isLoading, notifications } = useGetNotifications();
  const columns = [
    { key: "message", label: "Message", sortable: true },
    { key: "formatted_date", label: "Date", sortable: true },
    { key: "status", label: "Status", sortable: true },
  ];

  const actions = [
    {
      label: "View Details",
      icon: <Eye className="h-4 w-4" />,
      onClick: (notification: Notification) => {
        toast.success("Viewing notification details");
      },
    },
    {
      label: "Mark as Read",
      icon: <Edit2 className="h-4 w-4" />,
      onClick: (notification: Notification) => {
        toast.success("Marked as read");
      },
    },
    {
      label: "Delete",
      icon: <Trash2 className="h-4 w-4" />,
      onClick: (notification: Notification) => {
        toast.error("Notification deleted");
      },
    },
  ];

  if (isLoading) return <Spinner />;

  return (
    <DataTable
      title="Notifications"
      data={notifications || []}
      columns={columns}
      actions={actions}
    />
  );
};

export default NotificationsTable;
