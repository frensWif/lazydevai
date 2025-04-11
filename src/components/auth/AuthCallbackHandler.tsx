
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AuthCallbackHandlerProps {
  setError: (error: string | null) => void;
}

export default function AuthCallbackHandler({ setError }: AuthCallbackHandlerProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const handleAuthCallback = async () => {
      // Check if this is a wallet auth callback with a special parameter
      const params = new URLSearchParams(location.search);
      const walletAuth = params.get('wallet');
      
      try {
        // For both wallet auth and standard OAuth, verify we have a session
        const { data, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (data?.session) {
          const authType = walletAuth ? "with Phantom wallet" : "";
          toast.success(`Successfully signed in ${authType}`.trim());
          // Always navigate to dashboard for better UX
          navigate("/dashboard");
        } else {
          // No session found - throw error
          throw new Error("No session found after authentication");
        }
      } catch (err: any) {
        console.error("Error during auth callback:", err.message);
        setError(err.message);
        setTimeout(() => navigate("/auth"), 3000);
      }
    };
    
    handleAuthCallback();
  }, [navigate, location, setError]);
  
  return null;
}
