
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error("You need to be signed in to access this page");
      navigate("/auth");
    }
  }, [user, isLoading, navigate]);

  // Show loading state or return children if authenticated
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Loading...</h2>
          <div className="animate-spin h-8 w-8 border-4 border-neon-green border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  // Only render children if user is authenticated
  return user ? <>{children}</> : null;
}
