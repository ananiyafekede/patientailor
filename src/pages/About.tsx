
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Award, Clock, Users } from "lucide-react";
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>About Us - Hospital Management System</title>
        <meta name="description" content="Learn about our hospital management system and our commitment to providing quality healthcare services." />
      </Helmet>

      <section className="relative bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-6">The Best Healthcare Provider You Can Trust</h1>
              <p className="text-gray-600 mb-8">
                We are dedicated to providing accessible and efficient healthcare services through our modern management system. Our platform connects patients with qualified healthcare professionals, ensuring timely and quality medical care.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="text-blue-600 h-5 w-5" />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="text-blue-600 h-5 w-5" />
                  <span>Expert Doctors</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="text-blue-600 h-5 w-5" />
                  <span>High Success Rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="text-blue-600 h-5 w-5" />
                  <span>Certified Services</span>
                </div>
              </div>
              <Button 
                size="lg"
                onClick={() => navigate("/register")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Book Appointment
              </Button>
            </div>
            <div className="relative">
              <img
                src="/lovable-uploads/ae953740-d4b6-47e7-851a-06c5d2ad529b.png"
                alt="Healthcare Professional"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  To provide accessible, high-quality healthcare services through innovative technology and compassionate care.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  To be the leading healthcare provider, known for excellence in patient care and medical innovation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Integrity, compassion, excellence, and innovation in everything we do.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Choose Us</h2>
            <p className="text-gray-600 mt-4">Experience healthcare excellence with our comprehensive services</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-blue-600 h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Expert Doctors</h3>
              <p className="text-gray-600 text-sm">Highly qualified healthcare professionals</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-blue-600 h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Round-the-clock medical assistance</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-blue-600 h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Modern Technology</h3>
              <p className="text-gray-600 text-sm">State-of-the-art medical facilities</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-blue-600 h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Quality Care</h3>
              <p className="text-gray-600 text-sm">Patient-centered healthcare services</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
