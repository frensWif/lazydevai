
import { useState } from "react";
import AuthCallbackHandler from "@/components/auth/AuthCallbackHandler";
import CallbackLoading from "@/components/auth/CallbackLoading";

export default function AuthCallback() {
  const [error, setError] = useState<string | null>(null);
  
  return (
    <>
      <AuthCallbackHandler setError={setError} />
      <CallbackLoading error={error} />
    </>
  );
}
