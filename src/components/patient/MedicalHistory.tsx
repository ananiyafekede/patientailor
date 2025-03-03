
import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Spinner } from "@/components/ui/spinner";
import { useGetPatientReports } from "@/hooks/patient";
import { useAuth } from "@/contexts/AuthContext";

interface MedicalRecord {
  id: number;
  report_type: string;
  report_date: string;
  doctor_name: string;
  doctor_specialty: string;
  description: string;
  file_url?: string;
}

const MedicalHistory = () => {
  const { user } = useAuth();
  const { isLoading, reports, error } = useGetPatientReports();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-red-500">
            Error loading medical history. Please try again later.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Medical History</CardTitle>
          <CardDescription>View your past appointments and medical records</CardDescription>
        </CardHeader>
        <CardContent>
          {reports && reports.length > 0 ? (
            <div className="space-y-4">
              {reports.map((report) => (
                <Card key={report.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {report.report_type}
                        </CardTitle>
                        <CardDescription>
                          {format(new Date(report.created_at || new Date()), "PPP")}
                        </CardDescription>
                      </div>
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <strong>Report ID:</strong> {report.id}
                      </p>
                      {report.report_content && (
                        <div>
                          <strong>Details:</strong>
                          <p className="mt-1 text-sm">{JSON.stringify(report.report_content)}</p>
                        </div>
                      )}
                      <div className="pt-4 flex justify-end">
                        <Button variant="outline" size="sm">
                          <FileText className="mr-2 h-4 w-4" />
                          View Full Report
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No medical reports available
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalHistory;
