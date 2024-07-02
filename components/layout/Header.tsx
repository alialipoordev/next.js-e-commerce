"use client";

import React from "react";
import NavUI from "../module/NavUi";
import { usePathname } from "next/navigation";

function Header() {
  const path = usePathname();
  if (path.startsWith("/admin")) return null;

  return <NavUI cartItemsCount={0} />;
}

export default Header;
