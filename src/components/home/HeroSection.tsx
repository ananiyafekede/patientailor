import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white py-20 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Modern Healthcare Management
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Experience seamless healthcare delivery with our advanced hospital management system.
              Connecting patients with the best healthcare professionals.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() => navigate("/register")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Get Started
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
            <div className="aspect-square overflow-hidden rounded-full bg-gradient-to-tr from-blue-400 to-purple-400">
              <img
                src="/placeholder.svg"
                alt="Healthcare"
                className="h-full w-full object-cover opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};