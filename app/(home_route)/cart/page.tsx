import CartItems from "@/components/module/CartItems";
import { fetchCartProducts } from "@/lib/cartHelper";
import React from "react";

async function Cart() {
  const cart = await fetchCartProducts();

  if (!cart)
    return (
      <div className="p-4 max-w-screen-xl m-auto">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold">Your Cart Details</h1>
          <hr />
        </div>
        <h1 className="text-center font-semibold text-2xl opacity-40 py-10">
          Your cart is empty!
        </h1>
      </div>
    );

  return (
    <CartItems
      products={cart.products}
      cartTotal={cart.totalPrice}
      totalQty={cart.totalQty}
      cartId={cart.id}
    />
  );
}

export default Cart;
