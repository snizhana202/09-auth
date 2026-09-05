"use client";

import AuthForm from "@/components/AuthForm/AuthForm";
import { login } from "@/lib/api/clientApi";

export default function SignIn() {
  return <AuthForm title="Sign in" submitLabel="Sign in" onSubmit={login} />;
}
