import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const AnalyticsSection = () => {
  // Static data for development
  const revenueData = [
    { name: 'Jan', income: 4000, expense: 2400 },
    { name: 'Feb', income: 3000, expense: 1398 },
    { name: 'Mar', income: 2000, expense: 9800 },
    { name: 'Apr', income: 2780, expense: 3908 },
    { name: 'May', income: 1890, expense: 4800 },
    { name: 'Jun', income: 2390, expense: 3800 },
  ];

  const recentActivity = [
    { id: 1, name: 'Sarah Johnson', action: 'Appointment completed', time: '2:30 PM' },
    { id: 2, name: 'Mike Smith', action: 'Prescription updated', time: '1:45 PM' },
    { id: 3, name: 'Emma Davis', action: 'New appointment scheduled', time: '11:20 AM' },
  ];

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
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>{activity.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.name}</p>
                  <p className="text-xs text-gray-500">
                    {activity.action}
                  </p>
                </div>
                <time className="text-xs text-gray-500">
                  {activity.time}
                </time>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};