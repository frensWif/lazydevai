
import { Metadata } from "next";
import EmailSignInForm from "@/components/auth/EmailSignInForm";

export const metadata: Metadata = {
  title: "Sign In - LazyDev AI",
  description: "Sign in to your LazyDev AI account",
};

export default function SignInPage() {
  return (
    <div className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-10">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to sign in to your account
          </p>
        </div>
        <EmailSignInForm />
      </div>
    </div>
  );
}
