"use client";

import { SessionProvider } from "next-auth/react";

interface NextAuthProps {
  children: React.ReactNode;
}

function NextAuthProvider({ children }: NextAuthProps) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default NextAuthProvider;
