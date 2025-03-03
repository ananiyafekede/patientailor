
import { useMemo } from "react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Download, Eye } from "lucide-react";
import { Billing } from "@/types";

interface BillingHistoryProps {
  billings: Billing[];
  isLoading: boolean;
  error: Error | null;
}

export const BillingHistory = ({
  billings,
  isLoading,
  error,
}: BillingHistoryProps) => {
  const sortedBillings = useMemo(() => {
    if (!billings || !billings.length) return [];
    
    return [...billings].sort((a, b) => {
      // Sort by payment date, most recent first
      if (a.payment_date && b.payment_date) {
        return new Date(b.payment_date).getTime() - new Date(a.payment_date).getTime();
      }
      return 0;
    });
  }, [billings]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-red-500">
            Error loading billing history. Please try again later.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Billing History</CardTitle>
        <CardDescription>View and manage your payment history</CardDescription>
      </CardHeader>
      <CardContent>
        {sortedBillings.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            No billing records found
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedBillings.map((billing) => (
                  <TableRow key={billing.id}>
                    <TableCell className="font-medium">INV-{billing.id}</TableCell>
                    <TableCell>
                      {billing.payment_date
                        ? format(new Date(billing.payment_date), "MMM dd, yyyy")
                        : "Not paid"}
                    </TableCell>
                    <TableCell>${billing.amount}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          billing.payment_status === "paid"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }
                      >
                        {billing.payment_status === "paid" ? "Paid" : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                        {billing.payment_status === "paid" && (
                          <Button size="sm" variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Invoice
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
