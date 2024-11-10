"use client";

import { formatPrice } from "@/utils/helper";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import React, { useTransition } from "react";
import Wishlist from "../ui/Wishlist";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const updateWishlist = async () => {
    if (!id) return;

    const res = await fetch("/api/product/wishlist", {
      method: "POST",
      body: JSON.stringify({ productId: id }),
    });

    const { error } = await res.json();

    if (!res.ok && error) toast.error(error);

    router.refresh();
  };

  return (
    <div className="flex space-x-4 items-center">
      <Image src={thumbnail} width={100} height={100} alt={title} />
      <Link className="flex-1 h-full" href={`/${title}/${id}`}>
        <h1 className="text-lg text-blue-gray-700 font-semibold">{title}</h1>
        <p>{formatPrice(price)}</p>
      </Link>
      <Button
        variant="text"
        disabled={isPending}
        onClick={() => startTransition(async () => await updateWishlist())}
      >
        <Wishlist isActive />
      </Button>
    </div>
  );
}

export default WishlistProductCard;
