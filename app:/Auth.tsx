
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import EmailSignInForm from "@/components/auth/EmailSignInForm";
import EmailSignUpForm from "@/components/auth/EmailSignUpForm";
import SocialAuthButtons from "@/components/auth/SocialAuthButtons";
import BackNavigation from "@/components/auth/BackNavigation";

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

  return (
    <div className="container relative flex-1 flex items-center justify-center py-12 md:py-24">
      <BackNavigation />
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
              <EmailSignInForm 
                email={email}
                password={password}
                setEmail={setEmail}
                setPassword={setPassword}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                onSuccess={() => navigate('/')}
              />
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <EmailSignUpForm 
                email={email}
                password={password}
                confirmPassword={confirmPassword}
                setEmail={setEmail}
                setPassword={setPassword}
                setConfirmPassword={setConfirmPassword}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </TabsContent>
          </Tabs>

          <SocialAuthButtons 
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            isPhantomInstalled={isPhantomInstalled}
          />
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
