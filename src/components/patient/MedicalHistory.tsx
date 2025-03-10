
import { useState, useCallback } from "react";
import { Eye, FileIcon, FileText, File, FileImage, Download, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Spinner } from "@/components/ui/spinner";
import { useGetPatientReports } from "@/hooks/patient";
import { useQueryParams } from "@/hooks/useQueryParams";
import { Report } from "@/types";
import { DataTableWithFilters } from "@/components/ui/data-table/DataTableWithFilters";

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

const ReportDetailModal = ({ report, onBack }: { report: Report, onBack: () => void }) => {
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
          
          <Button 
            variant="outline" 
            onClick={onBack}
            className="mt-4"
          >
            Back to all reports
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const MedicalHistory = () => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  
  const { queryParams, setQueryParams, getFilteredQueryParams } = useQueryParams({
    page: 1,
    limit: 10,
    sort: "createdAt",
    order: "desc"
  });
  
  const { isLoading, reports, error, pagination } = useGetPatientReports(
    undefined, 
    getFilteredQueryParams()
  );
  
  const formatDate = useCallback((date: string | undefined) => {
    if (!date) return "N/A";
    try {
      return format(new Date(date), "PPP");
    } catch (error) {
      return "Invalid date";
    }
  }, []);
  
  const handleQueryChange = useCallback((newParams: Record<string, any>) => {
    setQueryParams(newParams);
  }, [setQueryParams]);
  
  // Define columns for DataTable
  const columns = [
    {
      key: "createdAt",
      label: "Date",
      sortable: true,
      render: (report: Report) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-blue-500" />
          {formatDate(report.createdAt)}
        </div>
      ),
    },
    {
      key: "type",
      label: "Type",
      sortable: true,
      filterable: true,
      filterOptions: [
        { label: "Prescription", value: "prescription" },
        { label: "Lab Result", value: "lab_result" },
        { label: "Report", value: "report" },
      ],
      render: (report: Report) => (
        <div className="flex items-center gap-2">
          {getFileIcon(report.file_url)}
          {formatReportType(report.type)}
        </div>
      ),
    },
    {
      key: "content",
      label: "Description",
      render: (report: Report) => (
        <span className="line-clamp-1">
          {typeof report.content === 'object' ? 
            Object.entries(report.content)[0]?.[1] || 'No description' 
            : String(report.content).substring(0, 50) + '...'}
        </span>
      ),
    },
  ];

  // Define actions
  const actions = [
    {
      label: "View Details",
      icon: <Eye className="h-4 w-4" />,
      onClick: (report: Report) => setSelectedReport(report),
    },
    {
      label: "Download",
      icon: <Download className="h-4 w-4" />,
      onClick: (report: Report) => {
        if (report.file_url) {
          window.open(report.file_url, '_blank');
        }
      },
      condition: (report: Report) => !!report.file_url,
    },
  ];

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
          {selectedReport ? (
            <ReportDetailModal 
              report={selectedReport} 
              onBack={() => setSelectedReport(null)} 
            />
          ) : reports && reports.length > 0 ? (
            <DataTableWithFilters
              data={reports}
              columns={columns}
              actions={actions}
              isLoading={isLoading}
              pagination={pagination || { page: 1, limit: 10, total: 0, totalPages: 0 }}
              searchFields={["type", "content"]}
              onQueryChange={handleQueryChange}
              showSearch={true}
            />
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
