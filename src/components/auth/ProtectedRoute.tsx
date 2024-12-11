import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles = [] }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    // For development, we'll simulate a quick auth check that always succeeds
    const checkAuth = async () => {
      // Simulate an API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setHasAccess(true);
      setLoading(false);
    };

    checkAuth();
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