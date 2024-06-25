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
  name: yup.string().required("Name is required!"),
  email: yup.string().email("Invalid email!").required("Email is required!"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(52, "Password must be less than 6 characters.")
    .required("Password is required!"),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Password doesn't match!")
});

function SignUpPage() {
  const [passwordScore, setPasswordScore] = React.useState(0);

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
      confirmPassword: "",
    },
    onSubmit: (values) => {
      console.log(values);
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
