
import { Edit2, Eye, Trash2 } from "lucide-react";
import { DataTable } from "@/components/ui/data-table/DataTable";
import { Spinner } from "@/components/ui/spinner";
import toast from "react-hot-toast";
import { format } from "date-fns";
import useGetAppointments from "@/features/appointments/useGetAppointments";

const AppointmentsTable = () => {
  const columns = [
    { key: "first_name", label: "Patient", sortable: true },
    { key: "specialty", label: "Doctor Specialty", sortable: true },
    { key: "appointment_date", label: "Date", sortable: true },
    { key: "appointment_time", label: "Time", sortable: true },
    { key: "status", label: "Status", sortable: true },
  ];

  const actions = [
    {
      label: "View Details",
      icon: <Eye className="h-4 w-4" />,
      onClick: (appointment: any) => {
        toast.success(`Viewing appointment for ${appointment.patient_name}`);
      },
    },
    {
      label: "Edit Appointment",
      icon: <Edit2 className="h-4 w-4" />,
      onClick: (appointment: any) => {
        toast.success(`Editing appointment for ${appointment.patient_name}`);
      },
    },
    {
      label: "Cancel Appointment",
      icon: <Trash2 className="h-4 w-4" />,
      onClick: (appointment: any) => {
        toast.error(`Canceling appointment for ${appointment.patient_name}`);
      },
    },
  ];

  const { isLoading, appointments } = useGetAppointments();

  if (isLoading) return <Spinner />;

  return (
    <DataTable
      title="Appointments"
      data={appointments || []}
      columns={columns}
      actions={actions}
    />
  );
};

export default AppointmentsTable;
