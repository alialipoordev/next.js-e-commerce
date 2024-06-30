import { authOptions } from "@/auth";
import { NextPageContext } from "next";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { redirect } from "next/navigation";
import * as React from "react";

interface GuestLayoutProps {
  children: React.ReactNode;
}

const GuestLayout: React.FunctionComponent<GuestLayoutProps> = async ({
  children,
}) => {
  const session = await getServerSession(authOptions);
  console.log(session)
  if (session) return redirect("/");

  return <div>{children}</div>;
};

export default GuestLayout;

