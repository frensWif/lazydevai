
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const handleAuthCallback = async () => {
      // Check if this is a wallet auth callback with a special parameter
      const params = new URLSearchParams(location.search);
      const walletAuth = params.get('wallet');
      
      if (walletAuth) {
        try {
          // Handle wallet-specific authentication (already processed in Auth.tsx)
          // Just redirect to the destination or home page
          navigate(params.get('redirectTo') || '/');
          return;
        } catch (err: any) {
          console.error("Error during wallet callback:", err.message);
          setError(err.message);
          setTimeout(() => navigate("/auth"), 3000);
          return;
        }
      }
      
      // Handle standard OAuth callbacks
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }

        if (data?.session) {
          navigate("/");
        } else {
          navigate("/auth");
        }
      } catch (err: any) {
        console.error("Error during auth callback:", err.message);
        setError(err.message);
        setTimeout(() => navigate("/auth"), 3000);
      }
    };
    
    handleAuthCallback();
  }, [navigate, location]);
  
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        {error ? (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-destructive">Authentication Error</h2>
            <p className="mb-4">{error}</p>
            <p>Redirecting you back to login...</p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4">Completing login...</h2>
            <div className="animate-spin h-8 w-8 border-4 border-neon-green border-t-transparent rounded-full mx-auto"></div>
          </>
        )}
      </div>
    </div>
  );
}
