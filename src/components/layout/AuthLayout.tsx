import { ReactNode, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Spinner } from "@/components/ui/spinner";
import toast from "react-hot-toast";

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    let mounted = true;
    
    const initializeAuth = async () => {
      try {
        // For development, simulate a successful auth check with static data
        if (mounted) {
          setUser({ email: 'admin@example.com' } as User);
          setUserRole('admin');
          setAuthChecked(true);
          setLoading(false);
        }
      } catch (error) {
        console.error('Auth error:', error);
        if (mounted) {
          toast.error('Authentication error');
          setAuthChecked(true);
          setLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, [navigate, location.pathname]);

  // Only show loading spinner on protected routes and when auth hasn't been checked yet
  const isProtectedRoute = !['/login', '/register', '/', '/about', '/contact', '/help'].includes(location.pathname);
  
  if (!authChecked && isProtectedRoute) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  // For development, we'll allow access to all routes
  return <>{children}</>;
};