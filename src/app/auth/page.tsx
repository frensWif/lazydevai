
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Authentication - LazyDev AI",
  description: "Sign in or sign up for LazyDev AI",
};

export default function AuthPage() {
  return (
    <div className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-10">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Authentication</h1>
          <p className="text-sm text-muted-foreground">
            Choose how you'd like to proceed
          </p>
        </div>
        
        <div className="flex flex-col gap-4">
          <Button asChild variant="default" className="w-full">
            <Link href="/auth/signin">Sign In</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/auth/signup">Create Account</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
