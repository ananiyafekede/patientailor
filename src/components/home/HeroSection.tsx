import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-center justify-center text-white px-4 md:px-6 lg:px-8">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1953&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
          Your Health, Our Priority
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto">
          Simplified Online Appointments and Care at Your Fingertips
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            onClick={() => navigate("/register")}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90"
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/patient/schedule")}
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border-white"
          >
            Book Appointment Now
          </Button>
        </div>
      </div>
    </section>
  );
};