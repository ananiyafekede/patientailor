import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AnalyticsSectionProps {
  revenueData: Array<{
    name: string;
    income: number;
    expense: number;
  }>;
}

export const AnalyticsSection = ({ revenueData }: AnalyticsSectionProps) => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      <Card className="bg-white/50 backdrop-blur border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-gray-900">Revenue Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                />
                <Bar dataKey="income" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" fill="#E11D48" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/50 backdrop-blur border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-gray-900">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>P{i + 1}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Patient {i + 1}</p>
                  <p className="text-xs text-gray-500">
                    Appointment completed
                  </p>
                </div>
                <time className="text-xs text-gray-500">
                  {new Date().toLocaleTimeString()}
                </time>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};