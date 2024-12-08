import { 
  Stethoscope, 
  Calendar, 
  ClipboardList, 
  HeartPulse,
  Clock,
  Users
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Services = () => {
  const services = [
    {
      title: "Expert Doctors",
      description: "Access to qualified healthcare professionals",
      icon: Stethoscope,
    },
    {
      title: "Easy Scheduling",
      description: "Book appointments with just a few clicks",
      icon: Calendar,
    },
    {
      title: "Digital Records",
      description: "Secure electronic health records system",
      icon: ClipboardList,
    },
    {
      title: "24/7 Care",
      description: "Round-the-clock medical assistance",
      icon: Clock,
    },
    {
      title: "Patient Portal",
      description: "Manage your healthcare journey online",
      icon: Users,
    },
    {
      title: "Emergency Care",
      description: "Immediate response for urgent cases",
      icon: HeartPulse,
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">Our Services</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Comprehensive healthcare services tailored to your needs
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index} className="transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <service.icon className="h-6 w-6 text-blue-600" />
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};