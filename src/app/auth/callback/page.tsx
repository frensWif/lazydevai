// src/app/auth/callback/page.tsx
"use client";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AuthCallbackHandlerProps {
  setError: (error: string | null) => void;
}

export default function AuthCallbackHandler({ setError }: AuthCallbackHandlerProps) {
  const navigate = useNavigate();
  const searchParams = useSearchParams();
  const walletAuth = searchParams.get('wallet');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log("Auth callback handler running...");
        
        // For both wallet auth and standard OAuth, verify we have a session
        const { data, error } = await supabase.auth.getSession();
        
        console.log("Session check result:", { data, error });
        
        if (error) throw error;
        
        if (data?.session) {
          const authType = walletAuth ? "with Phantom wallet" : "";
          toast.success(`Successfully signed in ${authType}`.trim());
          
          // Force redirect to dashboard
          console.log("Redirecting to dashboard...");
          window.location.href = '/dashboard';
        } else {
          // No session found - throw error
          console.log("No session found after authentication");
          throw new Error("No session found after authentication");
        }
      } catch (err: any) {
        console.error("Error during auth callback:", err.message);
        setError(err.message);
        setTimeout(() => navigate("/auth"), 3000);
      }
    };
    
    handleAuthCallback();
  }, [navigate, searchParams, setError]);

  return <></>;
}