"use client";

import React from "react";
import { Button, Input } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import AuthFormContainer from "../module/AuthFormContainer";

function SignUpPage() {
  const formErrors: string[] = [];

  return (
    <div className="h-screen flex items-center justify-center">
      <AuthFormContainer title="Create New Account">
        <Input name="name" label="Name" />
        <Input name="email" label="Email" />
        <Input name="password" label="Password" type="password" />
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
