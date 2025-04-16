
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";
import { ROUTES } from "@/lib/constants";

interface AuthCallbackHandlerProps {
  setError: (error: string | null) => void;
}

export default function AuthCallbackHandler({ setError }: AuthCallbackHandlerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const walletAuth = searchParams.get("wallet");
      const redirectTo = searchParams.get("redirectedFrom") || ROUTES.DASHBOARD;

      try {
        console.log("Auth callback handler running...");

        const { data, error } = await supabase.auth.getSession();

        console.log("Session check result:", { data, error });

        if (error) throw error;

        if (data?.session) {
          const authType = walletAuth ? "with Phantom wallet" : "";
          toast.success(`Successfully signed in ${authType}`.trim());

          // Next.js style redirect to dashboard or the redirected-from page
          console.log(`Redirecting to ${redirectTo}...`);
          router.push(redirectTo);
        } else {
          console.log("No session found after authentication");
          throw new Error("No session found after authentication");
        }
      } catch (err: any) {
        console.error("Error during auth callback:", err.message);
        setError(err.message);

        setTimeout(() => {
          router.push(ROUTES.AUTH);
        }, 3000);
      }
    };

    handleAuthCallback();
  }, [router, searchParams, setError]);

  return null;
}
