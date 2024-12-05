import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import toast from "react-hot-toast";

interface Doctor {
  user_id: number;
  specialty: string;
  qualification: string;
  experience_years: number;
}

const BookAppointment = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const { data: doctors, isLoading: doctorsLoading } = useQuery({
    queryKey: ['doctors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('doctors')
        .select('user_id, specialty, qualification, experience_years');
      
      if (error) throw error;
      return data as Doctor[];
    }
  });

  const { data: availableSlots, isLoading: slotsLoading } = useQuery({
    queryKey: ['availableSlots', selectedDoctor, selectedDate],
    enabled: !!(selectedDoctor && selectedDate),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('schedules')
        .select('*')
        .eq('doctor_id', selectedDoctor)
        .eq('schedule_date', format(selectedDate!, 'yyyy-MM-dd'));
      
      if (error) throw error;
      return data;
    }
  });

  const handleBookAppointment = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user found');

      const appointmentData = {
        patient_id: parseInt(session.user.id),
        doctor_id: parseInt(selectedDoctor),
        appointment_date: format(selectedDate!, 'yyyy-MM-dd'),
        appointment_time: selectedTime,
        status: 'pending'
      };

      const { error } = await supabase
        .from('appointments')
        .insert(appointmentData);

      if (error) throw error;
      
      toast.success('Appointment booked successfully!');
    } catch (error) {
      toast.error('Failed to book appointment');
      console.error('Booking error:', error);
    }
  };

  if (doctorsLoading) {
    return <div>Loading doctors...</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Select Date</CardTitle>
          <CardDescription>Choose your preferred appointment date</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => 
              date < new Date(new Date().setHours(0, 0, 0, 0)) || 
              date > new Date(new Date().setMonth(new Date().getMonth() + 2))
            }
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Select Doctor</CardTitle>
            <CardDescription>Choose a specialist for your appointment</CardDescription>
          </CardHeader>
          <CardContent>
            <Select onValueChange={setSelectedDoctor} value={selectedDoctor}>
              <SelectTrigger>
                <SelectValue placeholder="Select a doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctors?.map((doctor) => (
                  <SelectItem key={doctor.user_id} value={doctor.user_id.toString()}>
                    Dr. {doctor.specialty} ({doctor.qualification})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {selectedDoctor && selectedDate && (
          <Card>
            <CardHeader>
              <CardTitle>Available Time Slots</CardTitle>
              <CardDescription>Select your preferred time</CardDescription>
            </CardHeader>
            <CardContent>
              <Select onValueChange={setSelectedTime} value={selectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {availableSlots?.map((slot) => (
                    <SelectItem key={slot.id} value={slot.start_time}>
                      {format(new Date(`2000-01-01T${slot.start_time}`), 'p')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button 
                className="w-full mt-4"
                onClick={handleBookAppointment}
                disabled={!selectedTime}
              >
                Book Appointment
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;