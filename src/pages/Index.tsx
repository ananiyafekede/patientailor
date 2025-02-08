
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Clock, Calendar, Users, Star, Phone } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Welcome to Hospital Management System</title>
        <meta
          name="description"
          content="Modern hospital management system for efficient healthcare delivery"
        />
      </Helmet>
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Helping You to <br />
                <span className="text-blue-600">Stay Healthy</span>
              </h1>
              <p className="text-lg text-gray-600">
                Experience world-class healthcare with our team of expert doctors and modern facilities.
              </p>
              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/register")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Book Appointment
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate("/about")}
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/lovable-uploads/3352ac00-db78-4ce1-8dc5-4833ae564f70.png"
                alt="Doctor"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-400 h-5 w-5 fill-current" />
                  <span className="font-semibold">4.9/5.0</span>
                </div>
                <p className="text-sm text-gray-600">Patient Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-blue-600">1,200+</h3>
              <p className="text-gray-600">Happy Patients</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-blue-600">15+</h3>
              <p className="text-gray-600">Expert Doctors</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-blue-600">70+</h3>
              <p className="text-gray-600">Medical Services</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-blue-600">340+</h3>
              <p className="text-gray-600">Successful Treatments</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Best Quality Services</h2>
            <p className="text-gray-600">Comprehensive healthcare services tailored to your needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold mb-2">Medical Consultation</h3>
                <p className="text-gray-600 text-sm mb-4">Professional medical advice and treatment plans</p>
                <Button variant="link" className="text-blue-600 p-0">
                  Learn More →
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Become Our Next Happy Patient
          </h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied patients who trust us with their healthcare needs.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate("/register")}
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Book Your Appointment
          </Button>
        </div>
      </section>
    </>
  );
};

export default Index;
