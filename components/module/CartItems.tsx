"use client";
import React, { useState } from "react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";
import { formatPrice } from "@/utils/helper";
import CartCountUpdater from "./CartCountUpdater";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export interface Product {
  id: string;
  thumbnail: string;
  title: string;
  price: number;
  totalPrice: number;
  qty: number;
}

interface CartItemsProps {
  products: Product[];
  cartTotal: number;
  totalQty: number;
  cartId: string;
}

const CartItems: React.FC<CartItemsProps> = ({
  products = [],
  totalQty,
  cartTotal,
  cartId,
}) => {
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const updateCart = async (productId: string, quantity: number) => {
    setBusy(true);
    await fetch("/api/product/cart", {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    });
    setBusy(false);
    router.refresh();
  };

  const handleCheckout = async () => {
    setBusy(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({ cartId }),
    });

    const { error, url } = await res.json();
    if (!res.ok) {
      toast.error(error);
    } else {
      window.location.href = url;
    }
    setBusy(false);
  };

  return (
    <div className="max-w-screen-xl m-auto p-4">
      <table className="min-w-full divide-y divide-gray-200">
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="py-4">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  height={40}
                  width={40}
                />
              </td>
              <td className="py-4">{product.title}</td>
              <td className="py-4 font-semibold">
                {formatPrice(product.totalPrice)}
              </td>
              <td className="py-4">
                <CartCountUpdater
                  onDecrement={() => updateCart(product.id, -1)}
                  onIncrement={() => updateCart(product.id, 1)}
                  value={product.qty}
                  disabled={busy}
                />
              </td>
              <td className="py-4 text-right">
                <button
                  onClick={() => updateCart(product.id, -product.qty)}
                  disabled={busy}
                  className="text-red-500"
                  style={{ opacity: busy ? "0.5" : "1" }}
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-col justify-end items-end space-y-4">
        <div className="flex justify-end space-x-4 text-blue-gray-800">
          <p className="font-semibold text-2xl">Total</p>
          <div>
            <p className="font-semibold text-2xl">{formatPrice(cartTotal)}</p>
            <p className="text-right text-sm">{totalQty} items</p>
          </div>
        </div>
        <Button
          onClick={handleCheckout}
          className="shadow-none hover:shadow-none  focus:shadow-none focus:scale-105 active:scale-100"
          color="green"
          disabled={busy}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartItems;
