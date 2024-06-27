"use client";

import React from "react";
import { Button } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import AuthFormContainer from "../module/AuthFormContainer";
import { useFormik } from "formik";
import * as yup from "yup";
import InputForm from "../module/InputForm";
import { CiUser } from "react-icons/ci";
import { FiLock, FiMail } from "react-icons/fi";
import zxcvbn from "zxcvbn";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(32, "Name must be less than 32 characters")
    .matches(new RegExp("^[a-zA-Z]+$"), "No special characters allowed.")
    .required("Name is required!"),
  email: yup.string().email("Invalid email!").required("Email is required!"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(52, "Password must be less than 6 characters.")
    .required("Password is required!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Password doesn't match!"),
});

function SignUpPage() {
  const [passwordScore, setPasswordScore] = React.useState(0);

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
      confirmPassword: "",
    },
    onSubmit: async (values, action) => {
      action.setSubmitting(true);
      const res = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
      action.setSubmitting(false);
    },
  });

  const validatePasswordStrength = () => {
    let password = values.password;
    return zxcvbn(password ? password : "").score;
  };

  React.useEffect(() => {
    setPasswordScore(validatePasswordStrength());
  }, [values.password]);

  return (
    <div className="h-screen flex items-center justify-center">
      <AuthFormContainer title="Create New Account" onSubmit={handleSubmit}>
        <InputForm
          name="name"
          label="Name"
          type="text"
          icon={<CiUser />}
          placeholder="example"
          value={values.name}
          onChange={handleChange}
          disabled={isSubmitting}
          error={errors?.name}
          touched={touched?.name}
        />
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
        <Button disabled={isSubmitting} type="submit" className="w-full">
          Sign up
        </Button>
      </AuthFormContainer>
    </div>
  );
}

export default SignUpPage;
