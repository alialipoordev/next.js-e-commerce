"use client";

import { Button } from "@material-tailwind/react";
import React from "react";
import { useFormik } from "formik";
import Link from "next/link";
import * as yup from "yup";
import AuthFormContainer from "../module/AuthFormContainer";
import InputForm from "../module/InputForm";
import { FiLock } from "react-icons/fi";
import { toast } from "react-toastify";

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(52, "Password must be less than 6 characters.")
    .required("Password is required!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Password doesn't match!")
    .required("Confirm password is required"),
});

interface UpdatePasswordProps {
  userId: string;
  token: string;
}

export default function UpdatePasswordPage({
  userId,
  token,
}: UpdatePasswordProps) {
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
    initialValues: { password: "", confirmPassword: "" },
    validationSchema,
    onSubmit: async (values, actions) => {},
  });

  return (
    <div className="h-screen flex items-center justify-center">
      <AuthFormContainer title="Reset password" onSubmit={handleSubmit}>
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
        <InputForm
          name="confirmPassword"
          label="Confirm password"
          type="password"
          icon={<FiLock />}
          placeholder="******"
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors?.confirmPassword}
          touched={touched?.password}
          disabled={isSubmitting}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          Reset Password
        </Button>
        <div className="flex items-center justify-between">
          <Link href="/signup">Sign up</Link>
          <Link href="/signin">Sign in</Link>
        </div>
      </AuthFormContainer>
    </div>
  );
}
