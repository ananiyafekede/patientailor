import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] space-y-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          Welcome to Hospital Appointment System
        </h1>
        <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
          Book appointments with our experienced doctors and manage your healthcare journey efficiently.
        </p>
      </div>
      <div className="flex gap-4">
        <Button
          size="lg"
          onClick={() => navigate("/register")}
        >
          Get Started
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => navigate("/login")}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default Index;