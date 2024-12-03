import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DoctorDashboard = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Today's Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No appointments scheduled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Patient Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No patients in queue</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Consultations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No recent consultations</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorDashboard;