import { authOptions } from "@/auth";
import connectDB from "@/lib/connectDB";
import ReviewModel from "@/models/reviewModel";
import { ReviewRequestBody } from "@/types";
import { isValidObjectId } from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);

  if (!session?.user)
    return NextResponse.json(
      { error: "unauthorized request!" },
      { status: 401 }
    );

  const { productId, userId, comment, rating } =
    (await req.json()) as ReviewRequestBody;

  if (!isValidObjectId(productId) || !isValidObjectId(userId))
    return NextResponse.json(
      { error: "invalid product/user id!" },
      { status: 401 }
    );

  if (rating <= 0 || rating > 5)
    return NextResponse.json({ error: "invalid rating!" }, { status: 401 });

  await connectDB();

  const data = { comment, userId, product: productId, rating };

  await ReviewModel.findByIdAndUpdate({ userId, product: productId }, data, {
    upsert: true,
  });

  return NextResponse.json({ success: true }, { status: 201 });
};
