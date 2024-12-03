import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const fetchAnnouncements = async () => {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);
  
  if (error) throw error;
  return data;
};

export const Announcements = () => {
  const navigate = useNavigate();
  const { data: announcements, isLoading } = useQuery({
    queryKey: ['announcements'],
    queryFn: fetchAnnouncements,
  });

  if (isLoading) return <div>Loading announcements...</div>;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Latest Announcements</h2>
          <Button onClick={() => navigate('/help')} variant="outline">
            View All
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {announcements?.map((announcement) => (
            <Card key={announcement.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Announcement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{announcement.message}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {new Date(announcement.created_at).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};