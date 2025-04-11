
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
      const redirectTo = params.get('redirectTo') || '/dashboard'; // Default to dashboard for better UX
      
      if (walletAuth) {
        try {
          // For wallet auth, we've already set up the session in the Auth page
          // Just verify we have a session and redirect
          const { data, error } = await supabase.auth.getSession();
          
          if (error) throw error;
          
          if (data?.session) {
            toast.success("Successfully signed in with Phantom wallet");
            // Navigate to the dashboard or specified redirect
            navigate(redirectTo);
          } else {
            throw new Error("No session found after wallet authentication");
          }
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
          toast.success("Successfully signed in");
          navigate("/dashboard"); // Take users directly to dashboard for better UX
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
  }, [navigate, location, setError]);
  
  return null;
}
