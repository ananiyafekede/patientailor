import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Edit2, Eye, Trash2 } from "lucide-react";
import { DataTable } from "@/components/ui/data-table/DataTable";
import { supabase } from "@/integrations/supabase/client";
import { Spinner } from "@/components/ui/spinner";
import toast from "react-hot-toast";
import { format } from "date-fns";

export const NotificationsTable = () => {
  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching notifications:', error);
        throw error;
      }
      
      return data.map(notification => ({
        ...notification,
        formatted_date: format(new Date(notification.created_at), 'PPP'),
        status: notification.is_read ? 'Read' : 'Unread'
      }));
    }
  });

  const columns = [
    { key: "message", label: "Message", sortable: true },
    { key: "formatted_date", label: "Date", sortable: true },
    { key: "status", label: "Status", sortable: true },
  ];

  const actions = [
    {
      label: "View Details",
      icon: <Eye className="h-4 w-4" />,
      onClick: (notification: any) => {
        toast.success('Viewing notification details');
      },
    },
    {
      label: "Mark as Read",
      icon: <Edit2 className="h-4 w-4" />,
      onClick: (notification: any) => {
        toast.success('Marked as read');
      },
    },
    {
      label: "Delete",
      icon: <Trash2 className="h-4 w-4" />,
      onClick: (notification: any) => {
        toast.error('Notification deleted');
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