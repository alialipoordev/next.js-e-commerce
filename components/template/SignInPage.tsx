"use client";

import { Button } from "@material-tailwind/react";
import React from "react";
import { useFormik } from "formik";
import Link from "next/link";
import * as yup from "yup";
import AuthFormContainer from "../module/AuthFormContainer";
import InputForm from "../module/InputForm";
import { FiLock, FiMail } from "react-icons/fi";
import { signIn } from "next-auth/react";

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email!").required("Email is required!"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(52, "Password must be less than 6 characters.")
    .required("Password is required!"),
});

export default function SignInPage() {
  const [passwordScore, setPasswordScore] = React.useState(0);

  const {
    values,
    isSubmitting,
    touched,
    errors,
    handleSubmit,
    handleBlur,
    handleChange,
  } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: (values, actions) => {
      signIn("credentials",{...values});
    },
  });

  return (
    <div className="h-screen flex items-center justify-center">
      <AuthFormContainer title="Sign in" onSubmit={handleSubmit}>
        <InputForm
          name="email"
          label="Email"
          type="text"
          icon={<FiMail />}
          placeholder="example@example.com"
          value={values.email}
          onChange={handleChange}
          disabled={isSubmitting}
          error={errors?.email}
          touched={touched?.email}
        />
        <InputForm
          name="password"
          label="Password"
          type="password"
          icon={<FiLock />}
          placeholder="******"
          value={values.password}
          onChange={handleChange}
          disabled={isSubmitting}
          error={errors?.password}
          touched={touched?.password}
          passwordScore={passwordScore}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          Sign in
        </Button>
        <div className="flex items-center justify-between">
          <Link href="/signup">Sign up</Link>
          <Link href="/auth/forget-password">Forget password</Link>
        </div>
      </AuthFormContainer>
    </div>
  );
}
