"use client"

import React from "react";
import HorizontalMenu from "./HorizontalMenu";
import categories from "@/constant/categories";
import Link from "next/link";
import { Chip } from "@material-tailwind/react";

function CategoryMenu() {
  return (
    <HorizontalMenu>
      {categories.map((c) => (
        <Link key={c} href={`/browse-products/${c}`}>
          <Chip color="teal" className="mr-2" variant="outlined" value={c} />
        </Link>
      ))}
    </HorizontalMenu>
  );
}

export default CategoryMenu;
