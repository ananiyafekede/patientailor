
import { useState, useCallback } from "react";
import { useGetPatientBillings } from "@/hooks/patient";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, DollarSign, CreditCard } from "lucide-react";
import { format } from "date-fns";
import { Spinner } from "@/components/ui/spinner";
import { Billing } from "@/types";

export const BillingHistory = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { data, isLoading } = useGetPatientBillings(undefined, {
    page,
    limit,
  });

  const billings = data?.billings || [];
  const pagination = data?.pagination || { total: 0, limit: 10, page: 1, totalPages: 1 };

  const formatDate = useCallback((date: string | undefined) => {
    if (!date) return "N/A";
    try {
      return format(new Date(date), "PPP");
    } catch (error) {
      return "Invalid date";
    }
  }, []);

  const formatAmount = useCallback((amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }, []);

  const handlePrevious = useCallback(() => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  }, [page]);

  const handleNext = useCallback(() => {
    if (page < pagination.totalPages) {
      setPage((prev) => prev + 1);
    }
  }, [page, pagination.totalPages]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Billing History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {billings && billings.length > 0 ? (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bill ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment Method</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {billings.map((billing: Billing) => (
                  <TableRow key={billing.id}>
                    <TableCell>{billing.id}</TableCell>
                    <TableCell>{formatDate(billing.billing_date || billing.payment_date)}</TableCell>
                    <TableCell>{billing.service_name || `Appointment #${billing.appointment_id}`}</TableCell>
                    <TableCell>{formatAmount(billing.amount)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          billing.payment_status === "paid"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {billing.payment_status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        {billing.payment_method || "N/A"}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {((pagination.page - 1) * pagination.limit) + 1} to{" "}
                {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
                {pagination.total} entries
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevious}
                  disabled={pagination.page <= 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNext}
                  disabled={pagination.page >= pagination.totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No billing records available
          </div>
        )}
      </CardContent>
    </Card>
  );
};
