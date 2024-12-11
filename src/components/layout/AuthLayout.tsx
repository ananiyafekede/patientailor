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
    console.log('AuthLayout mounted');
    let mounted = true;
    
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Session:', session);
        
        if (session?.user && mounted) {
          setUser(session.user);
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
          
          console.log('Profile:', profile);
          if (mounted) {
            setUserRole(profile?.role);
          }
        }
      } catch (error) {
        console.error('Auth error:', error);
        toast.error('Authentication error');
      } finally {
        if (mounted) {
          setLoading(false);
          setAuthChecked(true);
        }
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log('Auth state changed:', _event, session?.user?.email);
      
      if (session?.user && mounted) {
        setUser(session.user);
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        if (mounted) {
          setUserRole(profile?.role);
        }
      } else if (mounted) {
        setUser(null);
        setUserRole(null);
        if (location.pathname !== '/login' && location.pathname !== '/register' && 
            location.pathname !== '/' && location.pathname !== '/about' && 
            location.pathname !== '/contact' && location.pathname !== '/help') {
          navigate('/login');
        }
      }
      if (mounted) {
        setLoading(false);
        setAuthChecked(true);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
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

  // If we're on a protected route and have no user after auth check, redirect to login
  if (authChecked && !user && isProtectedRoute) {
    navigate('/login');
    return null;
  }

  return <>{children}</>;
};