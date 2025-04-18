
import { Metadata } from "next";
import EmailSignUpForm from "@/components/auth/EmailSignUpForm";

export const metadata: Metadata = {
  title: "Sign Up - LazyDev AI",
  description: "Create a new account for LazyDev AI",
};

export default function SignUpPage() {
  return (
    <div className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-10">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Create Account</h1>
          <p className="text-sm text-muted-foreground">
            Enter your information to create a new account
          </p>
        </div>
        <EmailSignUpForm />
      </div>
    </div>
  );
}
