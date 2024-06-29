import { signOut } from "next-auth/react";
import * as React from "react";

interface SignOutButtonProps {
  children: React.ReactNode;
}

const SignOutButton: React.FunctionComponent<SignOutButtonProps> = ({
  children,
}) => {
  return <div onClick={async () => await signOut()}>{children}</div>;
};

export default SignOutButton;
