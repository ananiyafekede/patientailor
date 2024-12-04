import { Helmet } from 'react-helmet-async';
import { Services } from "@/components/home/Services";
import { Announcements } from "@/components/home/Announcements";
import { HeroSection } from "@/components/home/HeroSection";
import { Footer } from "@/components/home/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Hospital Appointment System - Your Health, Our Priority</title>
        <meta name="description" content="Book medical appointments online, access specialist doctors, and manage your healthcare journey with our easy-to-use hospital appointment system." />
        <meta name="keywords" content="hospital appointments, online booking, healthcare, medical services, doctors, specialists" />
        <meta property="og:title" content="Hospital Appointment System - Your Health, Our Priority" />
        <meta property="og:description" content="Book medical appointments online, access specialist doctors, and manage your healthcare journey with our easy-to-use hospital appointment system." />
        <meta property="og:type" content="website" />
      </Helmet>

      <HeroSection />
      <Services />
      <Announcements />
      <Footer />
    </>
  );
};

export default Index;