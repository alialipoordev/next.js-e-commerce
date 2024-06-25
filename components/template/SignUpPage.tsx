"use client";

import React from "react";
import { Button, Input } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import AuthFormContainer from "../module/AuthFormContainer";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required!"),
  email: yup.string().email("Invalid email!").required("Email is required!"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(52, "Password must be less than 6 characters.")
    .required("Password is required!"),
});

function SignUpPage() {
  const formErrors: string[] = [];

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    errors,
    touched,
  } = useFormik({
    validationSchema,
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="h-screen flex items-center justify-center">
      <AuthFormContainer title="Create New Account" onSubmit={handleSubmit}>
        <Input
          name="name"
          label="Name"
          value={values.name}
          onChange={handleChange}
        />
        <Input
          name="email"
          label="Email"
          value={values.email}
          onChange={handleChange}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
        <Button type="submit" className="w-full">
          Sign up
        </Button>
        <div className="">
          {formErrors.map((err) => {
            return (
              <div
                key={err}
                className="space-x-1 flex items-center text-red-500"
              >
                <XMarkIcon className="w-4 h-4" />
                <p className="text-xs">{err}</p>
              </div>
            );
          })}
        </div>
      </AuthFormContainer>
    </div>
  );
}

export default SignUpPage;
