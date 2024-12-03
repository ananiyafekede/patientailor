import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container flex h-16 items-center px-4 md:px-6">
          <div className="flex gap-6 md:gap-10">
            <Button
              variant="ghost"
              className="text-lg font-semibold"
              onClick={() => navigate("/")}
            >
              Hospital App
            </Button>
          </div>
          <nav className="hidden md:flex gap-6 ml-6">
            <Button variant="ghost" onClick={() => navigate("/about")}>About</Button>
            <Button variant="ghost" onClick={() => navigate("/contact")}>Contact</Button>
            <Button variant="ghost" onClick={() => navigate("/help")}>Help</Button>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};