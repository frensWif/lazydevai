// src/app/auth/signup/page.tsx
import { EmailSignUpForm } from "@/components/auth/EmailSignUpForm";

export default function SignUpPage() {
  return (
    <div>
      <h1>Sign Up</h1>
      <EmailSignUpForm />
    </div>
  );
}