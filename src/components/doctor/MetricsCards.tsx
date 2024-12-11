import { Users, Calendar, DollarSign, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const MetricsCards = () => {
  // Static data for development
  const metrics = {
    totalPatients: 450,
    todayAppointments: 8,
    completedToday: 3,
    revenue: 15000,
    rating: 4.8
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-white/50 backdrop-blur border-none shadow-lg hover:shadow-xl transition-all duration-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Total Patients</CardTitle>
          <Users className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{metrics.totalPatients}</div>
          <p className="text-xs text-gray-500 mt-1">
            +20% from last month
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-white/50 backdrop-blur border-none shadow-lg hover:shadow-xl transition-all duration-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Today's Appointments</CardTitle>
          <Calendar className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{metrics.todayAppointments}</div>
          <p className="text-xs text-gray-500 mt-1">
            {metrics.completedToday} completed
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-white/50 backdrop-blur border-none shadow-lg hover:shadow-xl transition-all duration-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-violet-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">${metrics.revenue}</div>
          <p className="text-xs text-gray-500 mt-1">
            +12% from last month
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-white/50 backdrop-blur border-none shadow-lg hover:shadow-xl transition-all duration-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Rating</CardTitle>
          <Star className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{metrics.rating}</div>
          <p className="text-xs text-gray-500 mt-1">
            Based on 129 reviews
          </p>
        </CardContent>
      </Card>
    </div>
  );
};