"use client";

import { formatPrice } from "@/utils/helper";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Wishlist from "../ui/Wishlist";

interface WishlistProductCardProps {
  product: {
    id: string;
    price: number;
    thumbnail: string;
    title: string;
  };
}

function WishlistProductCard({
  product: { id, price, thumbnail, title },
}: WishlistProductCardProps) {
  return (
    <div className="flex space-x-4 items-center">
      <Image src={thumbnail} width={100} height={100} alt={title} />
      <Link className="flex-1 h-full" href={`/${title}/${id}`}>
        <h1 className="text-lg text-blue-gray-700 font-semibold">{title}</h1>
        <p>{formatPrice(price)}</p>
      </Link>
      <Button variant="text">
        <Wishlist />
      </Button>
    </div>
  );
}

export default WishlistProductCard;
