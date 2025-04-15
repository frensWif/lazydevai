'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Chrome, Wallet } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { toast } from 'sonner';
import Spinner from '@/components/ui/spinner';

interface SocialAuthButtonsProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  isPhantomInstalled: boolean;
}

export default function SocialAuthButtons({
  isLoading,
  setIsLoading,
  isPhantomInstalled,
}: SocialAuthButtonsProps) {
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;
    } catch (error: any) {
      console.error('Google sign in error:', error.message);
      toast.error(error.message || 'Error signing in with Google');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhantomSignIn = async () => {
    if (!isPhantomInstalled) {
      toast.info('Redirecting to Phantom installation page...');
      window.open('https://phantom.app/', '_blank');
      return;
    }

    setIsLoading(true);
    try {
      const provider = (window as any)?.phantom?.solana;

      if (!provider?.isPhantom) {
        throw new Error('Phantom wallet not detected.');
      }

      const resp = await provider.connect();
      const publicKey = resp.publicKey.toString();
      const message = new TextEncoder().encode(
        `Sign this message to authenticate with LazyDevAI at ${new Date().toISOString()}`
      );
      const signedMessage = await provider.signMessage(message, 'utf8');

      const response = await fetch(
        'https://izvtsulcazrsnwwfzkrh.supabase.co/functions/v1/wallet-auth',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            publicKey,
            signature: signedMessage.signature,
            message: new TextDecoder().decode(message),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to authenticate wallet');
      }

      const { session } = await response.json();

      if (session) {
        await supabase.auth.setSession(session);
        toast.success('Successfully signed in with Phantom!');
        window.location.href = '/dashboard';
      } else {
        throw new Error('No session returned from wallet-auth');
      }
    } catch (error: any) {
      console.error('Phantom authentication error:', error);
      toast.error(error.message || 'Error signing in with Phantom');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <Button
          variant="outline"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Spinner className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              <Chrome className="mr-2 h-4 w-4" />
              Google
            </>
          )}
        </Button>

        <Button
          variant="outline"
          onClick={handlePhantomSignIn}
          disabled={isLoading}
          className={`w-full ${
            isPhantomInstalled ? '' : 'bg-muted text-muted-foreground'
          }`}
        >
          {isLoading ? (
            <>
              <Spinner className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              <Wallet className="mr-2 h-4 w-4" />
              {isPhantomInstalled ? 'Phantom' : 'Install Phantom'}
            </>
          )}
        </Button>
      </div>
    </>
  );
}
