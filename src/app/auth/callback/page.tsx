
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthCallbackHandler from "@/components/auth/AuthCallbackHandler";
import CallbackLoading from "@/components/auth/CallbackLoading";

export default function AuthCallbackPage() {
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <CallbackLoading error={error} />
      <AuthCallbackHandler setError={setError} />
    </div>
  );
}
