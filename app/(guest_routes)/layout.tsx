import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
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

