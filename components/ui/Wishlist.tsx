import React from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

interface WishlistProps {
  isActive?: boolean;
}

function Wishlist({ isActive }: WishlistProps) {
  return isActive ? (
    <HeartIconSolid className="w-6 h-6 text-red-500" />
  ) : (
    <HeartIcon className="w-6 h-6" />
  );
}

export default Wishlist;
