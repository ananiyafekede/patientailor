import { Helmet } from 'react-helmet-async';
import { Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Hospital Appointment System</title>
        <meta name="description" content="Learn about our hospital appointment system and our commitment to providing quality healthcare services." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Info className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">About Us</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
              <CardDescription>Providing Quality Healthcare</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We are dedicated to providing accessible and efficient healthcare services through our modern appointment system. Our platform connects patients with qualified healthcare professionals, ensuring timely and quality medical care.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Our Vision</CardTitle>
              <CardDescription>Future of Healthcare</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We envision a healthcare system where technology bridges the gap between patients and healthcare providers, making medical care more accessible, efficient, and patient-centered.
              </p>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Why Choose Us</CardTitle>
              <CardDescription>Benefits of Our Platform</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Easy online appointment booking</li>
                <li>Qualified and experienced healthcare professionals</li>
                <li>Efficient patient management system</li>
                <li>Secure and confidential service</li>
                <li>24/7 online access</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default About;