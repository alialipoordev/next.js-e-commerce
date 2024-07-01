"use client"

import useAuth from "@/hooks/useAuth";
import React from "react";

function EmailVerificationBanner() {
  const { profile } = useAuth();
  
  if(profile?.verified) return null

  return (
    <div className="p-2 text-center bg-blue-50">
      <span>It looks like you haven&apos;t verified your email.</span>
      <button className="ml-2 font-semibold underline">
        Get verification link.
      </button>
    </div>
  );
}

export default EmailVerificationBanner;
