"use client";

import { Button } from "@material-tailwind/react";
import React from "react";
import { useFormik } from "formik";
import Link from "next/link";
import * as yup from "yup";
import AuthFormContainer from "../module/AuthFormContainer";
import InputForm from "../module/InputForm";
import { FiMail } from "react-icons/fi";
import { toast } from "react-toastify";

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email!").required("Email is required!"),
});

export default function ForgotPasswordPage() {
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
    onSubmit: async (values, actions) => {},
  });

  return (
    <div className="h-screen flex items-center justify-center">
      <AuthFormContainer title="Forgot Password" onSubmit={handleSubmit}>
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
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          Send Link
        </Button>
        <div className="flex items-center justify-between">
          <Link href="/signup">Sign up</Link>
          <Link href="/signup">Sign up</Link>
        </div>
      </AuthFormContainer>
    </div>
  );
}
