import React from "react";
import NavUI from "../module/NavUi";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import CartModel from "@/models/cartModel";
import { Types } from "mongoose";

const getCartItemsCount = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) return 0;

    const cart = await CartModel.aggregate([
      { $match: { userId: new Types.ObjectId(session.user.id) } },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$_id",
          totalQuantity: { $sum: "$items.quantity" },
        },
      },
    ]);

    if (cart.length) {
      return cart[0].totalQuantity;
    } else {
      return 0;
    }
  } catch (error) {
    console.log(error);
    return 0;
  }
};

async function Header() {
  const cartItemsCount = await getCartItemsCount();

  return <NavUI cartItemsCount={cartItemsCount} />;
}

export default Header;
