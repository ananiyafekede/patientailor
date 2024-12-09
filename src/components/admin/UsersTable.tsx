import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Edit2, Eye, Trash2 } from "lucide-react";
import { DataTable } from "@/components/ui/data-table/DataTable";
import { supabase } from "@/integrations/supabase/client";
import { Spinner } from "@/components/ui/spinner";
import toast from "react-hot-toast";

export const UsersTable = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
      
      return data;
    }
  });

  const columns = [
    { key: "first_name", label: "First Name", sortable: true },
    { key: "last_name", label: "Last Name", sortable: true },
    { key: "role", label: "Role", sortable: true },
    { key: "created_at", label: "Created At", sortable: true },
  ];

  const actions = [
    {
      label: "View Details",
      icon: <Eye className="h-4 w-4" />,
      onClick: (user: any) => {
        toast.success(`Viewing details for ${user.first_name}`);
      },
    },
    {
      label: "Edit User",
      icon: <Edit2 className="h-4 w-4" />,
      onClick: (user: any) => {
        toast.success(`Editing ${user.first_name}`);
      },
    },
    {
      label: "Delete User",
      icon: <Trash2 className="h-4 w-4" />,
      onClick: (user: any) => {
        toast.error(`Delete ${user.first_name}`);
      },
    },
  ];

  if (isLoading) return <Spinner />;

  return (
    <DataTable
      title="Users"
      data={users || []}
      columns={columns}
      actions={actions}
    />
  );
};