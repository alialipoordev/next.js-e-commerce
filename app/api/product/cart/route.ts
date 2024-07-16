import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { NewCartRequest } from "./../../../../types/index";
import { isValidObjectId } from "mongoose";
import connectDB from "@/lib/connectDB";
import CartModel from "@/models/cartModel";

export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!user)
      return NextResponse.json(
        { error: "Unauthorized request!" },
        { status: 401 }
      );

    const { productId, quantity } = (await req.json()) as NewCartRequest;
    if (!isValidObjectId(productId) || isNaN(quantity))
      return NextResponse.json({ error: "Invalid request!" }, { status: 401 });

    await connectDB();
    const cart = await CartModel.findOne({ userId: user.id });
    if (!cart) {
      // creating new cart
      await CartModel.create({
        userId: user.id,
        items: [{ productId, quantity }],
      });
      return NextResponse.json({ success: true });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (existingItem) {
      // update quantity
      existingItem.quantity += quantity;
      if (existingItem.quantity <= 0) {
        // remove item
        cart.items = cart.items.filter(
          (item) => item.productId.toString() !== productId
        );
      }
    } else {
      // add new item
      cart.items.push({ productId: productId as any, quantity });
    }

    await cart.save();
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
