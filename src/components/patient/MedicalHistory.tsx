
import { useQuery } from "@tanstack/react-query";
import { FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface Doctor {
  specialty: string;
  qualification: string;
}

interface Appointment {
  id: number;
  appointment_date: string;
  doctors: Doctor;
  medical_notes?: string;
}

const MedicalHistory = () => {
  const { data: appointments, isLoading } = useQuery({
    queryKey: ['medicalHistory'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user found');
      
      // Convert user ID to number if needed or use string comparison in the query
      const userId = session.user.id;
      
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          id,
          appointment_date,
          medical_notes,
          doctors:doctor_id (
            specialty,
            qualification
          )
        `)
        .eq('patient_id', userId)
        .eq('is_completed', true)
        .order('appointment_date', { ascending: false });
        
      if (error) throw error;
      return data as unknown as Appointment[];
    }
  });

  if (isLoading) {
    return <div>Loading medical history...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Medical History</CardTitle>
          <CardDescription>View your past appointments and medical records</CardDescription>
        </CardHeader>
        <CardContent>
          {appointments && appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          Appointment with Dr. {appointment.doctors.specialty}
                        </CardTitle>
                        <CardDescription>
                          {new Date(appointment.appointment_date).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <strong>Doctor:</strong> {appointment.doctors.qualification}
                      </p>
                      {appointment.medical_notes && (
                        <div>
                          <strong>Medical Notes:</strong>
                          <p className="mt-1 text-sm">{appointment.medical_notes}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No medical history available
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalHistory;
