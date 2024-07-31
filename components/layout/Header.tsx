import React from "react";
import NavUI from "../module/NavUi";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import CartModel from "@/models/cartModel";
import { Types } from "mongoose";
import connectDB from "@/lib/connectDB";
import UserModel from "@/models/userModel";

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

const fetchUserAvatar = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  await connectDB();
  const user = await UserModel.findById(session.user.id);

  if (!user) return null;

  return {
    avatar: user.avatar?.url,
  };
};

async function Header() {
  const cartItemsCount = await getCartItemsCount();
  const userAvatar = await fetchUserAvatar();

  return <NavUI cartItemsCount={cartItemsCount} avatar={userAvatar?.avatar} />;
}

export default Header;
