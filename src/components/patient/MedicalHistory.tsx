import { useEffect, useState } from "react";
import { Eye, FileIcon, FileText, File, FileImage, Download, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Spinner } from "@/components/ui/spinner";
import { useGetPatientReports } from "@/hooks/patient";
import { useAuth } from "@/contexts/AuthContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Report } from "@/types";

const getFileIcon = (fileType: string | undefined) => {
  if (!fileType) return <FileText className="h-5 w-5" />;
  
  if (fileType.includes("pdf")) return <File className="h-5 w-5 text-red-500" />;
  if (fileType.includes("image")) return <FileImage className="h-5 w-5" />;
  return <FileIcon className="h-5 w-5" />;
};

const formatReportType = (type: string | undefined) => {
  if (!type) return "Unknown";
  return type.charAt(0).toUpperCase() + type.slice(1);
};

const ReportDetailModal = ({ report }: { report: Report }) => {
  return (
    <Card className="w-full">
      <CardHeader className="bg-blue-50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg text-blue-700">
              {formatReportType(report.type)}
            </CardTitle>
            <CardDescription>
              {report.createdAt && format(new Date(report.createdAt), "PPP")}
            </CardDescription>
          </div>
          {report.file_url && (
            <Button variant="outline" size="sm" asChild>
              <a href={report.file_url} target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" />
                Download
              </a>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-sm text-gray-500">Report ID</h3>
            <p>{report.id}</p>
          </div>
          
          {report.content && (
            <div className="space-y-2">
              <h3 className="font-medium text-sm text-gray-500">Details</h3>
              <div className="bg-blue-50 p-4 rounded-md">
                {typeof report.content === 'object' ? (
                  <div className="space-y-2">
                    {Object.entries(report.content).map(([key, value]) => (
                      <div key={key}>
                        <span className="font-semibold capitalize">{key}: </span>
                        <span>{value as string}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>{String(report.content)}</p>
                )}
              </div>
            </div>
          )}
          
          {report.file_url && (
            <div className="space-y-2">
              <h3 className="font-medium text-sm text-gray-500">Attachments</h3>
              <div className="p-4 border rounded-md">
                {report.file_url.includes('image') ? (
                  <img 
                    src={report.file_url} 
                    alt="Medical report attachment" 
                    className="max-w-full h-auto rounded-md"
                  />
                ) : report.file_url.includes('pdf') ? (
                  <div className="flex items-center justify-between bg-gray-100 p-3 rounded">
                    <div className="flex items-center">
                      <File className="h-8 w-8 text-red-500 mr-3" />
                      <span>PDF Document</span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={report.file_url} target="_blank" rel="noopener noreferrer">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </a>
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-gray-100 p-3 rounded">
                    <div className="flex items-center">
                      <FileIcon className="h-8 w-8 text-blue-500 mr-3" />
                      <span>Document</span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={report.file_url} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const MedicalHistory = () => {
  const { user } = useAuth();
  const { isLoading, reports, error } = useGetPatientReports();
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

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
          <CardDescription>View your past medical records and prescriptions</CardDescription>
        </CardHeader>
        <CardContent>
          {reports && reports.length > 0 ? (
            <div className="space-y-6">
              {selectedReport ? (
                <div className="space-y-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedReport(null)}
                    className="mb-2"
                  >
                    Back to all reports
                  </Button>
                  <ReportDetailModal report={selectedReport} />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.map((report) => (
                      <TableRow key={report.id} className="hover:bg-blue-50/50 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-blue-500" />
                            {report.createdAt && format(new Date(report.createdAt), "PPP")}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getFileIcon(report.file_url)}
                            {formatReportType(report.type)}
                          </div>
                        </TableCell>
                        <TableCell>
                          {typeof report.content === 'object' ? 
                            Object.entries(report.content)[0]?.[1] || 'No description' 
                            : String(report.content).substring(0, 50) + '...'}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedReport(report)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed rounded-md border-gray-300 bg-gray-50">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <p className="text-lg font-medium text-gray-500">No medical reports available</p>
              <p className="text-sm text-gray-400 mt-1">Your medical history will appear here once your doctor uploads them</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalHistory;
