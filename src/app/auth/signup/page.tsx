import React, { useState } from "react";
import EmailSignUpForm from "@/components/auth/EmailSignUpForm"; // Ensure correct import path

export default function SignUpPage() {
  // Managing state for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <h1>Sign Up</h1>

      {/* Pass the necessary props to EmailSignUpForm */}
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
    </div>
  );
}
