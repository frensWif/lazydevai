
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Chrome, Wallet } from "lucide-react"; 
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export default function AuthenticationPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isPhantomInstalled, setIsPhantomInstalled] = useState<boolean>(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    if (user) {
      navigate('/');
    }
    
    // Check if Phantom wallet is installed
    const checkPhantomWallet = async () => {
      if ('phantom' in window) {
        const provider = (window as any).phantom?.solana;
        setIsPhantomInstalled(provider?.isPhantom || false);
      }
    };
    
    checkPhantomWallet();
  }, [user, navigate]);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      toast.success("Successfully signed in!");
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || "Error signing in");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      toast.success("Account created! Please check your email for verification.");
    } catch (error: any) {
      toast.error(error.message || "Error signing up");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) {
        throw error;
      }
    } catch (error: any) {
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
      const provider = (window as any).phantom?.solana;
      
      // Request connection to wallet
      const resp = await provider.connect();
      const publicKey = resp.publicKey.toString();
      
      // Sign a message with Phantom to verify ownership
      const message = new TextEncoder().encode(
        `Sign this message to authenticate with LazyDevAI at ${new Date().toISOString()}`
      );
      
      const signedMessage = await provider.signMessage(message, 'utf8');
      
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
      
      const { session, redirectTo } = await response.json();
      
      if (session) {
        // Set the session in Supabase client
        await supabase.auth.setSession(session);
        toast.success("Successfully signed in with Phantom!");
        
        // Redirect to callback page which will handle session setup
        if (redirectTo) {
          window.location.href = redirectTo;
        } else {
          navigate('/');
        }
      }
    } catch (error: any) {
      console.error('Phantom authentication error:', error);
      toast.error(error.message || "Error signing in with Phantom");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container relative flex-1 flex items-center justify-center py-12 md:py-24">
      <div className="absolute inset-0 z-[-1] opacity-5 bg-[url('/placeholder.svg')] bg-cover bg-center"></div>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-4">
              <form onSubmit={handleEmailSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    placeholder="name@example.com" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to="#"
                      className="text-sm underline text-muted-foreground hover:text-neon-green"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button className="w-full hover:bg-neon-green/90" type="submit" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleEmailSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input 
                    id="signup-email" 
                    placeholder="name@example.com" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input 
                    id="signup-password" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input 
                    id="confirm-password" 
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <Button className="w-full hover:bg-neon-green/90" type="submit" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Sign Up"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

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
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground">
          By continuing, you agree to our{" "}
          <Link to="#" className="underline underline-offset-4 hover:text-neon-green">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="#" className="underline underline-offset-4 hover:text-neon-green">
            Privacy Policy
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
