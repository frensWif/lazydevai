
import { useState } from "react";
import AuthCallbackHandler from "@/components/auth/AuthCallbackHandler";
import CallbackLoading from "@/components/auth/CallbackLoading";
import BackNavigation from "@/components/auth/BackNavigation";

export default function AuthCallback() {
  const [error, setError] = useState<string | null>(null);
  
  return (
    <>
      <BackNavigation />
      <AuthCallbackHandler setError={setError} />
      <CallbackLoading error={error} />
    </>
  );
}
