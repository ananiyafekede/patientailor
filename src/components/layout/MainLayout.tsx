import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User as UserIcon, ChevronDown, LogOut, Menu } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthLayout } from "./AuthLayout";
import { useLogout } from "@/hooks/auth";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isPending, logout } = useLogout();
  const handleLogout = async () => {
    logout();
  };

  return (
    <AuthLayout>
      <div className="min-h-screen bg-background">
        <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
          <div className="container flex h-16 items-center px-4 md:px-6">
            <Button
              variant="ghost"
              className="text-lg font-semibold md:hidden"
              onClick={() => navigate("/")}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              className="hidden text-lg font-semibold md:block"
              onClick={() => navigate("/")}
            >
              Hospital App
            </Button>
            <nav className="hidden md:flex gap-6 ml-6">
              <Button variant="ghost" onClick={() => navigate("/about")}>
                About
              </Button>
              <Button variant="ghost" onClick={() => navigate("/contact")}>
                Contact
              </Button>
              <Button variant="ghost" onClick={() => navigate("/help")}>
                Help
              </Button>
              {user && user.role === "admin" && (
                <Button
                  variant="ghost"
                  onClick={() => navigate("/admin/dashboard")}
                >
                  Admin Dashboard
                </Button>
              )}
              {user && user.role === "doctor" && (
                <Button
                  variant="ghost"
                  onClick={() => navigate("/doctor/dashboard")}
                >
                  Doctor Dashboard
                </Button>
              )}
              {user && user.role === "patient" && (
                <Button
                  variant="ghost"
                  onClick={() => navigate("/patient/dashboard")}
                >
                  Patient Dashboard
                </Button>
              )}
            </nav>
            <div className="ml-auto flex items-center gap-2">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <UserIcon className="h-4 w-4" />
                      <span className="hidden md:inline">{user.email}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {user.role === "admin" && (
                      <DropdownMenuItem
                        onClick={() => navigate("/admin/dashboard")}
                      >
                        Admin Dashboard
                      </DropdownMenuItem>
                    )}
                    {user.role === "doctor" && (
                      <DropdownMenuItem
                        onClick={() => navigate("/doctor/dashboard")}
                      >
                        Doctor Dashboard
                      </DropdownMenuItem>
                    )}
                    {user.role === "patient" && (
                      <DropdownMenuItem
                        onClick={() => navigate("/patient/dashboard")}
                      >
                        Patient Dashboard
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => navigate("/login")}>
                    Login
                  </Button>
                  <Button onClick={() => navigate("/register")}>
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">{children}</main>
      </div>
    </AuthLayout>
  );
};
