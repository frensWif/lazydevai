
import React from 'react';

interface CallbackLoadingProps {
  error: string | null;
}

export default function CallbackLoading({ error }: CallbackLoadingProps) {
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
