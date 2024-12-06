import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // For development, we're bypassing all auth checks and role verification
  return <>{children}</>;
};

export default ProtectedRoute;