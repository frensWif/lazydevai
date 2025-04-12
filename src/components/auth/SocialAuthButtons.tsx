
import React from "react";
import { Button } from "@/components/ui/button";
import { Chrome, Wallet } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface SocialAuthButtonsProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  isPhantomInstalled: boolean;
}

export default function SocialAuthButtons({
  isLoading,
  setIsLoading,
  isPhantomInstalled
}: SocialAuthButtonsProps) {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    
    try {
      console.log("Starting Google sign in...");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });
      
      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error("Google sign in error:", error.message);
      toast.error(error.message || "Error signing in with Google");
      setIsLoading(false);
    }
  };

  const handlePhantomSignIn = async () => {
    if (!isPhantomInstalled) {
      window.open('https://phantom.app/', '_blank');
      return;
    }

    setIsLoading(true);
    try {
      console.log("Starting Phantom sign in...");
      const provider = (window as any).phantom?.solana;
      
      // Request connection to wallet
      const resp = await provider.connect();
      const publicKey = resp.publicKey.toString();
      console.log("Connected to wallet with public key:", publicKey);
      
      // Sign a message with Phantom to verify ownership
      const message = new TextEncoder().encode(
        `Sign this message to authenticate with LazyDevAI at ${new Date().toISOString()}`
      );
      
      const signedMessage = await provider.signMessage(message, 'utf8');
      console.log("Message signed successfully");
      
      // Call our Edge Function to authenticate with Supabase
      const response = await fetch('https://izvtsulcazrsnwwfzkrh.supabase.co/functions/v1/wallet-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          publicKey,
          signature: signedMessage.signature,
          message: new TextDecoder().decode(message)
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to authenticate wallet');
      }
      
      const { session } = await response.json();
      console.log("Received session from wallet-auth function:", session ? "Yes" : "No");
      
      if (session) {
        // Set the session in Supabase client
        await supabase.auth.setSession(session);
        toast.success("Successfully signed in with Phantom!");
        
        // Redirect directly to dashboard
        window.location.href = '/dashboard';
      }
    } catch (error: any) {
      console.error('Phantom authentication error:', error);
      toast.error(error.message || "Error signing in with Phantom");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full neon-button"
        >
          <Chrome className="mr-2 h-4 w-4" />
          Google
        </Button>
        
        <Button
          variant="outline"
          onClick={handlePhantomSignIn}
          disabled={isLoading}
          className={`w-full ${isPhantomInstalled ? 'neon-button' : 'bg-muted'}`}
        >
          <Wallet className="mr-2 h-4 w-4" />
          {isPhantomInstalled ? 'Phantom' : 'Install Phantom'}
        </Button>
      </div>
    </>
  );
}
