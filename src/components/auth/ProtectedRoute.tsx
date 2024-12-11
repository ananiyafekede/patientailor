import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Spinner } from "@/components/ui/spinner";
import toast from "react-hot-toast";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles = [] }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          throw sessionError;
        }

        if (!session?.user) {
          console.log('No session found, redirecting to login');
          navigate('/login');
          return;
        }

        if (allowedRoles.length > 0) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (profileError) {
            console.error('Profile error:', profileError);
            throw profileError;
          }

          if (!profile?.role || !allowedRoles.includes(profile.role)) {
            console.log('User role not authorized:', profile?.role);
            toast.error('You do not have permission to access this page');
            navigate('/');
            return;
          }
        }

        if (mounted) {
          setHasAccess(true);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        toast.error('Authentication error occurred');
        navigate('/login');
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      mounted = false;
    };
  }, [navigate, allowedRoles]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return hasAccess ? <>{children}</> : null;
};

export default ProtectedRoute;