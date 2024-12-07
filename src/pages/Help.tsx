import { Helmet } from 'react-helmet-async';
import { HelpCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Help = () => {
  return (
    <>
      <Helmet>
        <title>Help & FAQ - Hospital Appointment System</title>
        <meta name="description" content="Find answers to frequently asked questions about our hospital appointment system." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Help & FAQ</h1>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to common questions about our services</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I book an appointment?</AccordionTrigger>
                  <AccordionContent>
                    To book an appointment, log in to your account, navigate to the booking section, select your preferred doctor and available time slot, and confirm your appointment. You'll receive a confirmation email with the details.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>How can I cancel or reschedule my appointment?</AccordionTrigger>
                  <AccordionContent>
                    You can cancel or reschedule your appointment by logging into your account, going to "My Appointments," and selecting the appointment you wish to modify. Please note that cancellations should be made at least 24 hours in advance.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>What should I bring to my appointment?</AccordionTrigger>
                  <AccordionContent>
                    Please bring a valid ID, your insurance card (if applicable), and any relevant medical records or test results. If it's your first visit, please arrive 15 minutes early to complete necessary paperwork.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>How do I view my medical history?</AccordionTrigger>
                  <AccordionContent>
                    Your medical history is available in your patient dashboard under the "Medical History" section. This includes past appointments, prescriptions, and test results.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>Is my information secure?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we take your privacy seriously. All your personal and medical information is encrypted and stored securely following HIPAA guidelines. Only authorized healthcare providers can access your medical records.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need More Help?</CardTitle>
              <CardDescription>Contact our support team</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you couldn't find the answer you're looking for, our support team is here to help. You can reach us through:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Email: support@hospital.com</li>
                <li>Phone: (123) 456-7890</li>
                <li>Live Chat: Available Monday-Friday, 9 AM - 5 PM</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Help;