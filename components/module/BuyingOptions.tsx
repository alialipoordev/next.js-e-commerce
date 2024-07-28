"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@material-tailwind/react";
import CartCountUpdater from "./CartCountUpdater";
import useAuth from "@/hooks/useAuth";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function BuyingOptions() {
  const [quantity, setQuantity] = useState(1);
  const { loggedIn } = useAuth();
  const [isPending, startTransition] = useTransition();
  const { product } = useParams();
  const productId = product[1];

  const router = useRouter();

  const handleIncrement = () => {
    setQuantity((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    if (quantity === 0) return;
    setQuantity((prevCount) => prevCount - 1);
  };

  const addToCart = async () => {
    if (!productId) return;

    if (!loggedIn) return router.push("/signin");

    const res = await fetch("/api/product/cart", {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    });

    const { error } = await res.json();

    if (!res.ok && error) toast.error(error);

    router.refresh()
  };

  return (
    <div className="flex items-center space-x-2">
      <CartCountUpdater
        onDecrement={handleDecrement}
        onIncrement={handleIncrement}
        value={quantity}
      />

      <Button
        disabled={isPending}
        onClick={() => startTransition(async () => await addToCart())}
        variant="text"
      >
        Add to Cart
      </Button>
      <Button disabled={isPending} color="amber" className="rounded-full">
        Buy Now
      </Button>
    </div>
  );
}
