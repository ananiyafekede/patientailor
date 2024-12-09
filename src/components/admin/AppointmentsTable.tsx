import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Edit2, Eye, Trash2 } from "lucide-react";
import { DataTable } from "@/components/ui/data-table/DataTable";
import { supabase } from "@/integrations/supabase/client";
import { Spinner } from "@/components/ui/spinner";
import toast from "react-hot-toast";
import { format } from "date-fns";

export const AppointmentsTable = () => {
  const { data: appointments, isLoading } = useQuery({
    queryKey: ['admin-appointments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          patients (
            first_name,
            last_name
          ),
          doctors (
            specialty,
            qualification
          )
        `)
        .order('appointment_date', { ascending: false });
      
      if (error) {
        console.error('Error fetching appointments:', error);
        throw error;
      }
      
      return data.map(appointment => ({
        ...appointment,
        formatted_date: format(new Date(appointment.appointment_date), 'PPP'),
        formatted_time: format(new Date(`2000-01-01T${appointment.appointment_time}`), 'p'),
        patient_name: `${appointment.patients.first_name} ${appointment.patients.last_name}`,
        doctor_specialty: appointment.doctors.specialty
      }));
    }
  });

  const columns = [
    { key: "patient_name", label: "Patient", sortable: true },
    { key: "doctor_specialty", label: "Doctor Specialty", sortable: true },
    { key: "formatted_date", label: "Date", sortable: true },
    { key: "formatted_time", label: "Time", sortable: true },
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