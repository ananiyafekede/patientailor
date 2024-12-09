import { ReactNode, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
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

  useEffect(() => {
    console.log('AuthLayout mounted');
    
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Session:', session);
        
        if (session?.user) {
          setUser(session.user);
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
          
          console.log('Profile:', profile);
          setUserRole(profile?.role);
        }
      } catch (error) {
        console.error('Auth error:', error);
        toast.error('Authentication error');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log('Auth state changed:', _event, session?.user?.email);
      
      if (session?.user) {
        setUser(session.user);
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        setUserRole(profile?.role);
      } else {
        setUser(null);
        setUserRole(null);
        if (location.pathname !== '/login' && location.pathname !== '/register') {
          navigate('/login');
        }
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate, location.pathname]);

  // Only show loading spinner on protected routes and when actually loading auth state
  const isProtectedRoute = !['/login', '/register', '/', '/about', '/contact', '/help'].includes(location.pathname);
  if (loading && isProtectedRoute && !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If we're on a protected route and have no user after loading, redirect to login
  if (!loading && !user && isProtectedRoute) {
    navigate('/login');
    return null;
  }

  return <>{children}</>;
};