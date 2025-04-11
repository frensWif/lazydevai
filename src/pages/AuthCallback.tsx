
import { useState } from "react";
import AuthCallbackHandler from "@/components/auth/AuthCallbackHandler";
import CallbackLoading from "@/components/auth/CallbackLoading";
import BackNavigation from "@/components/auth/BackNavigation";

export default function AuthCallback() {
  const [error, setError] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen bg-background">
      <BackNavigation />
      <AuthCallbackHandler setError={setError} />
      <CallbackLoading error={error} />
    </div>
  );
}
