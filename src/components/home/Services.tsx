import { Calendar, UserRound, Stethoscope, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Calendar,
    title: "Online Appointments",
    description: "Book and manage your appointments with ease through our online system.",
  },
  {
    icon: UserRound,
    title: "Specialist Doctors",
    description: "Access to highly qualified specialists across various medical fields.",
  },
  {
    icon: Stethoscope,
    title: "Treatment History Access",
    description: "View and track your complete medical history securely online.",
  },
  {
    icon: CreditCard,
    title: "Secure Billing & Payments",
    description: "Convenient and secure online payment options for all services.",
  },
];

export const Services = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <service.icon className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-center">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600">{service.description}</p>
                <Button variant="link" className="w-full mt-4">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};