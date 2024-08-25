import { authOptions } from "@/auth";
import connectDB from "@/lib/connectDB";
import OrderModel from "@/models/orderModel";
import { isValidObjectId } from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const validStatus = ["delivered", "ordered", "shipped"];

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "admin")
    return NextResponse.json(
      { error: "unauthorized request!" },
      { status: 401 }
    );

  const { orderId, deliveryStatus } = await req.json();

  if (!isValidObjectId(orderId) || !validStatus.includes(deliveryStatus))
    return NextResponse.json({ error: "Invalid data!" }, { status: 401 });

  await connectDB();
  await OrderModel.findByIdAndUpdate(orderId, { deliveryStatus });

  return NextResponse.json({ success: true });
};
