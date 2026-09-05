"use client";

import AuthForm from "@/components/AuthForm/AuthForm";
import { register } from "@/lib/api/clientApi";

export default function SignUp() {
  return (
    <AuthForm title="Sign up" submitLabel="Register" onSubmit={register} />
  );
}
