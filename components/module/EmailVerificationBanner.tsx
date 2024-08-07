"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  id?: string;
  verified?: boolean;
}

function EmailVerificationBanner({ id, verified }: Props) {
  const [submitting, setSubmitting] = useState(false);

  const applyForReverification = async () => {
    if (!id) return;

    setSubmitting(true);
    const res = await fetch("/api/users/verify?userId=" + id);

    const { message, error } = await res.json();

    if (!res.ok && error) {
      toast.error(error);
    }

    toast.success(message);
    setSubmitting(false);
  };

  if (verified) return null;

  return (
    <div className="p-2 text-center bg-blue-50 mb-2">
      <span>It looks like you haven&apos;t verified your email.</span>
      <button
        disabled={submitting}
        onClick={applyForReverification}
        className="ml-2 font-semibold underline"
      >
        {submitting ? "Generating link please wait!" : "Get verification link."}
      </button>
    </div>
  );
}

export default EmailVerificationBanner;
