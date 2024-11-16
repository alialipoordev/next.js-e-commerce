"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Footer() {
  const path = usePathname();
  if (path.startsWith("/admin")) return null;

  return (
    <footer className="flex flex-col text-black-100 mt-5 border-t border-gray-200 mx-auto max-w-screen-xl ">
      <div className="flex justify-between items-center flex-wrap  sm:px-16 px-6 py-10">
        <p>Next Ecom. All Rights Reserved</p>
        <div className="flex justify-between gap-4">
          <Link href="/" className="text-gray-500">
            Privacy Policy
          </Link>
          <Link href="/" className="text-gray-500">
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
