
import { useState } from "react";
import { format } from "date-fns";
import { DollarSign, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { useGetPatientBillings } from "@/hooks/patient";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const BillingHistory = () => {
  const { data: bills, isLoading, error } = useGetPatientBillings();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Unable to load billing history. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View and manage your medical bills</CardDescription>
        </CardHeader>
        <CardContent>
          {bills && bills.length > 0 ? (
            <div className="space-y-4">
              {bills.map((bill) => (
                <Card key={bill.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {bill.appointments?.doctors?.specialty || "Medical"} Consultation
                        </CardTitle>
                        <CardDescription>
                          {bill.appointments?.appointment_date 
                            ? format(new Date(bill.appointments.appointment_date), "PPP") 
                            : "Date not available"}
                        </CardDescription>
                      </div>
                      <Badge
                        variant={bill.payment_status === "paid" ? "default" : "destructive"}
                      >
                        {bill.payment_status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 text-muted-foreground mr-2" />
                        <span className="text-2xl font-bold">${bill.amount}</span>
                      </div>
                      {bill.payment_status !== "paid" && (
                        <Button>Pay Now</Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No billing history available
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingHistory;
