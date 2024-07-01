import { authOptions } from "@/auth";
import EmailVerificationBanner from "@/components/module/EmailVerificationBanner";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import * as React from "react";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

const PrivateLayout: React.FunctionComponent<PrivateLayoutProps> = async ({
  children,
}) => {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/signin");


  return (
    <div className="max-w-screen-xl mx-auto p-4 xl:p-0">
      <EmailVerificationBanner />
      {children}
    </div>
  );
};

export default PrivateLayout;
