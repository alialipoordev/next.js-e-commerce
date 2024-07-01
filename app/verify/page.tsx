"use client";

import { notFound, useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "react-toastify";

interface VerifyProps {
  searchParams: {
    token: string;
    userId: string;
  };
}

const Verify: React.FunctionComponent<VerifyProps> = ({ searchParams }) => {
  const { token, userId } = searchParams;
  const router = useRouter()

  React.useEffect(() => {
    fetch("/api/users/verify", {
      method: "POST",
      body: JSON.stringify({ token, userId }),
      headers: { "Content-Type": "application/json" },
    }).then(async (res) => {
      const { error, message } = (await res.json()) as {
        message: string;
        error: string;
      };

      if (res.ok) {
        toast.success(message);
      }

      if (!res.ok && error) {
        toast.error(error);
      }

      router.replace("/");
    });
  }, []);

  if (!token || !userId) return notFound();
  return (
    <div className="text-3xl opacity-70 text-center p-5 animate-pulse">
      <p>loading...</p>
      <p>we are verifying your email</p>
    </div>
  );
};

export default Verify;
