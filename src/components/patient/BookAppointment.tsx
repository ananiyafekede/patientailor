
import { useEffect, useState } from "react";
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
import { useGetDoctors } from "@/hooks/doctor";
import { useGetScheduleForDoctor } from "@/hooks/schedule";
import { useBookAppointment } from "@/hooks/patient";

const BookAppointment = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string>("");
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
    if (!selectedScheduleId || !selectedDoctor) return;
    
    // Find the selected schedule from the schedules array
    const selectedSchedule = schedules.find(schedule => schedule.id.toString() === selectedScheduleId);
    
    if (!selectedSchedule) return;
    
    bookAppointment({
      doctor_id: selectedDoctor,
      schedule_id: parseInt(selectedScheduleId),
      appointment_date: selectedSchedule.schedule_date,
      appointment_time: selectedSchedule.start_time,
      notes: "Follow-up appointment for patient evaluation.",
    });
  };

  function handleTimeChange(scheduleId: string) {
    setSelectedScheduleId(scheduleId);
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
                value={selectedScheduleId}
                disabled={slotsLoading || !schedules?.length}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {schedules?.map((slot) => (
                    <SelectItem key={slot.id} value={slot.id.toString()}>
                      {format(new Date(`2000-01-01T${slot.start_time}`), "p")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                className="w-full mt-4"
                onClick={handleBookAppointment}
                disabled={!selectedScheduleId || isPending}
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
