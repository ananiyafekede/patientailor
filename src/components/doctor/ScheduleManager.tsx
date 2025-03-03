import { useState, useEffect } from "react";
import { useGetDoctorSchedule, useSetDoctorSchedule } from "@/hooks/schedule";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { Clock } from "lucide-react";

const ScheduleManager = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");

  const {
    schedules,
    isLoading: isLoadingSchedule,
    error: scheduleError,
  } = useGetDoctorSchedule({
    schedule_date: selectedDate
      ? format(selectedDate, "yyyy-MM-dd")
      : undefined,
  });

  const { isPending: isSettingSchedule, setScheduleMutation } =
    useSetDoctorSchedule();

  // Check if schedule exists for selected date
  const existingSchedule = schedules?.find(
    (schedule) => schedule.schedule_date === format(selectedDate!, "yyyy-MM-dd")
  );

  // Update form values if schedule exists
  useEffect(() => {
    if (existingSchedule) {
      setStartTime(existingSchedule.start_time);
      setEndTime(existingSchedule.end_time);
    } else {
      // Reset to defaults if no schedule exists
      setStartTime("09:00");
      setEndTime("17:00");
    }
  }, [existingSchedule]);

  // Handle schedule submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Form validation
    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }

    if (startTime >= endTime) {
      toast.error("End time must be after start time");
      return;
    }

    const scheduleData = {
      schedule_date: format(selectedDate, "yyyy-MM-dd"),
      start_time: startTime,
      end_time: endTime,
    };

    setScheduleMutation(scheduleData);
  };

  // Show error if any
  useEffect(() => {
    if (scheduleError) {
      toast.error("Failed to load schedule");
      console.error(scheduleError);
    }
  }, [scheduleError]);

  return (
    <div className="rounded-lg overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="border-0"
              disabled={{ before: new Date() }}
            />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              {existingSchedule ? "Update Schedule" : "Set Schedule"}
            </h3>

            {isLoadingSchedule ? (
              <div className="flex justify-center py-4">
                <Spinner />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Selected Date</Label>
                  <Input
                    id="date"
                    value={selectedDate ? format(selectedDate, "PPP") : ""}
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSettingSchedule}
                >
                  {isSettingSchedule ? (
                    <>
                      <Spinner />
                      Saving...
                    </>
                  ) : existingSchedule ? (
                    "Update Schedule"
                  ) : (
                    "Set Schedule"
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScheduleManager;
