import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppointmentList from "@/components/doctor/AppointmentList";

const DoctorDashboard = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Today's Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Appointments today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Patient Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Patients waiting</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Completed Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Consultations completed</p>
          </CardContent>
        </Card>
      </div>
      <AppointmentList />
    </div>
  );
};

export default DoctorDashboard;