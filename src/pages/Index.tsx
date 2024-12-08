import { Helmet } from "react-helmet-async";
import { HeroSection } from "@/components/home/HeroSection";
import { Services } from "@/components/home/Services";
import { Announcements } from "@/components/home/Announcements";
import { Footer } from "@/components/home/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Welcome to Hospital Management System</title>
        <meta name="description" content="Modern hospital management system for efficient healthcare delivery" />
      </Helmet>

      <div className="min-h-screen">
        <HeroSection />
        <Services />
        <Announcements />
        <Footer />
      </div>
    </>
  );
};

export default Index;