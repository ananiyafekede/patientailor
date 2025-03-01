import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import toast from "react-hot-toast";
import { useGetDoctors } from "@/hooks/doctor";
import { useGetScheduleForDoctor } from "@/hooks/schedule";
import { useBookAppointment } from "@/hooks/patient";

interface Doctor {
  user_id: number;
  specialty: string;
  qualification: string;
  experience_years: number;
}

const BookAppointment = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedSchedule, setSelectedSchedule] = useState<string | undefined>(
    undefined
  );
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");

  const {
    doctors,
    isLoading: doctorsLoading,
    error: doctorsError,
  } = useGetDoctors();

  const {
    isLoading: slotsLoading,
    schedules,
    error: scheduleError,
    refetch: refetchSchedules,
  } = useGetScheduleForDoctor(selectedDoctor, selectedDate);

  const { bookAppointment, isPending } = useBookAppointment();

  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      refetchSchedules();
    }
  }, [selectedDoctor, selectedDate, refetchSchedules]);

  const handleBookAppointment = async () => {
    bookAppointment({
      doctor_id: selectedDoctor,
      schedule_id: schedules[0].id,
      appointment_date: schedules[0].schedule_date,
      appointment_time: schedules[0].start_time,
      notes: "Follow-up appointment for patient evaluation.",
    });
  };

  function handleTimeChange(e) {
    console.log("==================Schedule==================");
    console.log(e);
    console.log("====================================");
  }
  if (doctorsLoading) {
    return <div>Loading doctors...</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Select Date</CardTitle>
          <CardDescription>
            Choose your preferred appointment date
          </CardDescription>
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
            <CardDescription>
              Choose a specialist for your appointment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select onValueChange={setSelectedDoctor} value={selectedDoctor}>
              <SelectTrigger>
                <SelectValue placeholder="Select a doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctors?.map((doctor) => (
                  <SelectItem
                    key={doctor.user_id}
                    value={doctor.user_id.toString()}
                  >
                    Dr. {doctor.first_name} ({doctor.specialty})
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
              <Select
                onValueChange={handleTimeChange}
                value={selectedTime}
                disabled={slotsLoading || !schedules?.length}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {schedules?.map((slot) => (
                    <SelectItem key={slot.id} value={slot.start_time}>
                      {format(new Date(`2000-01-01T${slot.start_time}`), "p")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                className="w-full mt-4"
                onClick={handleBookAppointment}
                disabled={!selectedTime || isPending}
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
