import { Edit2, Eye, Trash2 } from "lucide-react";
import { DataTable } from "@/components/ui/data-table/DataTable";
import { Spinner } from "@/components/ui/spinner";
import toast from "react-hot-toast";
import useGetUsers from "@/features/users/useGetUsers";
import { User } from "@/types";

const UsersTable = () => {
  const { isLoading, users } = useGetUsers();
  const columns = [
    { key: "username", label: "First Name", sortable: true },
    { key: "role", label: "Role", sortable: true },
    { key: "created_at", label: "Created At", sortable: true },
  ];

  const actions = [
    {
      label: "View Details",
      icon: <Eye className="h-4 w-4" />,
      onClick: (user: User) => {
        toast.success(`Viewing details for ${user.username}`);
      },
    },
    {
      label: "Edit User",
      icon: <Edit2 className="h-4 w-4" />,
      onClick: (user: User) => {
        toast.success(`Editing ${user.username}`);
      },
    },
    {
      label: "Delete User",
      icon: <Trash2 className="h-4 w-4" />,
      onClick: (user: User) => {
        toast.error(`Delete ${user.username}`);
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

export default UsersTable;
