"use client";

import css from "@/components/SignInPage/SignInPage.module.css";
import { login } from "@/lib/api/clientApi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ApiError } from "@/app/api/api";
import { useAuthStore } from "@/lib/store/authStore";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface SignInValues {
  email: string;
  password: string;
}

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required")
    .test(
      "no-spaces",
      "Email cannot contain spaces",
      (value) => !value || !/\s/.test(value),
    ),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .test(
      "no-spaces",
      "Password cannot contain spaces",
      (value) => !value || !/\s/.test(value),
    )
    .test(
      "not-only-special-chars",
      "Password must contain at least one letter or number",
      (value) => !value || /[a-zA-Z0-9]/.test(value),
    ),
});

export default function SignIn() {
  const router = useRouter();
  const [formError, setFormError] = useState("");

  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (values: SignInValues) => {
    setFormError("");

    try {
      const user = await login(values);
      if (user) {
        setUser(user);
        router.push("/profile");
      } else {
        setFormError("Invalid email or password");
      }
    } catch (error) {
      const apiError = error as ApiError;
      const status = apiError.response?.status;

      if (status === 401 || status === 400) {
        setFormError(
          apiError.response?.data?.error ?? "Invalid email or password",
        );
      } else {
        setFormError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign in</h1>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignInSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <div className={css.formGroup}>
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                type="email"
                name="email"
                className={css.input}
              />
              <ErrorMessage
                name="email"
                component="span"
                className={css.fieldError}
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="password">Password</label>
              <Field
                id="password"
                type="password"
                name="password"
                className={css.input}
              />
              <ErrorMessage
                name="password"
                component="span"
                className={css.fieldError}
              />
            </div>

            {formError && <div className={css.error}>{formError}</div>}

            <div className={css.actions}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={css.submitButton}
              >
                Sign in
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
}
