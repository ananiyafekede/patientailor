import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Calendar, Award } from "lucide-react";

export const Announcements = () => {
  const announcements = [
    {
      title: "New Specialist Joining",
      date: "December 15, 2023",
      content: "We're excited to welcome Dr. Sarah Johnson, a renowned cardiologist, to our team.",
      icon: Award,
    },
    {
      title: "Holiday Schedule",
      date: "December 20, 2023",
      content: "Updated holiday working hours and emergency contact information.",
      icon: Calendar,
    },
    {
      title: "Health Awareness Week",
      date: "January 5, 2024",
      content: "Join us for a week of free health checkups and wellness seminars.",
      icon: Bell,
    },
  ];

  return (
    <section className="bg-gray-50 py-20 dark:bg-gray-800/50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">Latest Updates</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Stay informed about our latest news and events
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {announcements.map((announcement, index) => (
            <Card key={index} className="transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <announcement.icon className="h-6 w-6 text-blue-600" />
                  {announcement.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-gray-500">{announcement.date}</p>
                <p className="text-gray-600 dark:text-gray-300">{announcement.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};