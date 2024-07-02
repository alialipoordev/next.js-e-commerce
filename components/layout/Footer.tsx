"use client";

import React from "react";
import { usePathname } from "next/navigation";

function Footer() {
  const path = usePathname();
  if (path.startsWith("/admin")) return null;

  return <div>Footer</div>;
}

export default Footer;
