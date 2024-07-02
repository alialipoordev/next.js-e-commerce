import { authOptions } from "@/auth";
import AdminSidebar from "@/components/module/AdminSidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import * as React from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FunctionComponent<AdminLayoutProps> = async ({
  children,
}) => {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user.role === "admin"

  if (!isAdmin) return redirect("/signin");

  return <AdminSidebar>{children}</AdminSidebar>;
};

export default AdminLayout;
