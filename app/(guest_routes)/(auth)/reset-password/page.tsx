import UpdatePasswordPage from "@/components/template/UpdatePasswordPage";
import connectDB from "@/lib/connectDB";
import PasswordResetToken from "@/models/passwordResetToken";
import { notFound } from "next/navigation";
import React from "react";

interface ResetPasswordProps {
  searchParams: {
    token: string;
    userId: string;
  };
}

const fetchTokenValidation = async (token: string, userId: string) => {
  await connectDB();

  const resetToken = await PasswordResetToken.findOne({ user: userId });
  if (!resetToken) return null;

  const matched = await resetToken.compareToken(token);
  if (!matched) return null;

  return true;
};

async function ResetPassword({ searchParams }: ResetPasswordProps) {
  const { token, userId } = searchParams;

  if (!token || !userId) return notFound();

  const isValid = await fetchTokenValidation(token, userId);
  if (!isValid) return notFound();

  return <UpdatePasswordPage token={token} userId={userId} />;
}

export default ResetPassword;
