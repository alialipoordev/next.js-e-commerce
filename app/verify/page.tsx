import { notFound } from "next/navigation";
import * as React from "react";

interface VerifyProps {
  searchParams: {
    token: string;
    userId: string;
  };
}

const Verify: React.FunctionComponent<VerifyProps> = ({ searchParams }) => {
  const { token, userId } = searchParams;

  if (!token || !userId) return notFound();
  return (
    <div className="text-3xl opacity-70 text-center p-5 animate-pulse">
      <p>loading...</p>
      <p>we are verifying your email</p>
    </div>
  );
};

export default Verify;
