// src/app/auth/callback/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/router"; // Correct hook for Next.js routing
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

interface AuthCallbackHandlerProps {
  setError: (error: string | null) => void;
}

export default function AuthCallbackHandler({ setError }: AuthCallbackHandlerProps) {
  const router = useRouter(); // Replaced `useNavigate` with `useRouter`
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
          router.push('/dashboard'); // Using `router.push` to navigate
        } else {
          // No session found - throw error
          console.log("No session found after authentication");
          throw new Error("No session found after authentication");
        }
      } catch (err: any) {
        console.error("Error during auth callback:", err.message);
        setError(err.message);
        setTimeout(() => router.push("/auth"), 3000); // Using `router.push` for redirect
      }
    };

    handleAuthCallback();
  }, [router, searchParams, setError]); // Added `router` to dependencies

  return <></>;
}
