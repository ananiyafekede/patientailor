import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface Doctor {
  specialty: string;
  qualification: string;
}

interface Appointment {
  appointment_date: string;
  doctors: Doctor;
}

interface Bill {
  id: number;
  amount: number;
  payment_status: string;
  payment_method?: string;
  payment_date?: string;
  created_at?: string;
  appointment_id?: number;
  appointments?: Appointment;
}

const BillingHistory = () => {
  const { data: bills, isLoading } = useQuery({
    queryKey: ['billingHistory'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user found');
      
      const { data, error } = await supabase
        .from('billing')
        .select(`
          *,
          appointments (
            appointment_date,
            doctors:doctor_id (
              specialty,
              qualification
            )
          )
        `)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data as unknown as Bill[];
    }
  });

  if (isLoading) {
    return <div>Loading billing history...</div>;
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
                          {bill.appointments?.doctors?.specialty} Consultation
                        </CardTitle>
                        <CardDescription>
                          {format(new Date(bill.appointments?.appointment_date), "PPP")}
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