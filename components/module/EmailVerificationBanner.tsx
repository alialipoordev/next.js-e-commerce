"use client";

import useAuth from "@/hooks/useAuth";
import React, { useState } from "react";
import { toast } from "react-toastify";

function EmailVerificationBanner() {
  const { profile } = useAuth();
  const [submitting, setSubmitting] = useState(false);


  const applyForReverification = async () => {
    if (!profile) return;

    setSubmitting(true);
    const res = await fetch("/api/users/verify?userId=" + profile.id);

    const { message, error } = await res.json();

    if (!res.ok && error) {
      toast.error(error);
    }

    toast.success(message);
    setSubmitting(false);
  };

  if (profile?.verified) return null;

  return (
    <div className="p-2 text-center bg-blue-50">
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
