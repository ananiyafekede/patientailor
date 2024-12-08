import { ReactNode, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User as UserIcon, ChevronDown, LogOut } from "lucide-react";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
          
          if (error) throw error;
          
          setUserRole(profile?.role);
          
          // Redirect based on role if on login page
          if (location.pathname === '/login') {
            switch (profile?.role) {
              case 'admin':
                navigate('/admin/dashboard');
                break;
              case 'doctor':
                navigate('/doctor/dashboard');
                break;
              case 'patient':
                navigate('/patient/dashboard');
                break;
              default:
                navigate('/');
            }
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Auth error:', error);
        toast.error('Authentication error');
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        setUserRole(profile?.role);
      } else {
        setUserRole(null);
        if (location.pathname !== '/login' && location.pathname !== '/register') {
          navigate('/login');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, location.pathname]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Logged out successfully');
      navigate("/login");
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error logging out');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

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
            {user && userRole === 'admin' && (
              <Button variant="ghost" onClick={() => navigate("/admin/dashboard")}>
                Admin Dashboard
              </Button>
            )}
            {user && userRole === 'doctor' && (
              <Button variant="ghost" onClick={() => navigate("/doctor/dashboard")}>
                Doctor Dashboard
              </Button>
            )}
            {user && userRole === 'patient' && (
              <Button variant="ghost" onClick={() => navigate("/patient/dashboard")}>
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
                    <span>{user.email}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {userRole === 'admin' && (
                    <DropdownMenuItem onClick={() => navigate("/admin/dashboard")}>
                      Admin Dashboard
                    </DropdownMenuItem>
                  )}
                  {userRole === 'doctor' && (
                    <DropdownMenuItem onClick={() => navigate("/doctor/dashboard")}>
                      Doctor Dashboard
                    </DropdownMenuItem>
                  )}
                  {userRole === 'patient' && (
                    <DropdownMenuItem onClick={() => navigate("/patient/dashboard")}>
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
      <main>{children}</main>
    </div>
  );
};