import { authOptions } from "@/auth";
import connectDB from "@/lib/connectDB";
import ProductModel from "@/models/productModel";
import ReviewModel from "@/models/reviewModel";
import { ReviewRequestBody } from "@/types";
import { isValidObjectId, Types } from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user)
      return NextResponse.json(
        { error: "unauthorized request!" },
        { status: 401 }
      );

    const { productId, comment, rating } =
      (await req.json()) as ReviewRequestBody;

    if (!isValidObjectId(productId))
      return NextResponse.json(
        { error: "invalid product id!" },
        { status: 401 }
      );

    if (rating <= 0 || rating > 5)
      return NextResponse.json({ error: "invalid rating!" }, { status: 401 });

    await connectDB();

    const userId = session.user.id;

    const data = { comment, userId, product: productId, rating };

    await ReviewModel.findOneAndUpdate({ userId, product: productId }, data, {
      upsert: true,
    });

    await updateProductRating(productId);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "something went wrong!, could not update review!" },
      { status: 500 }
    );
  }
};

const updateProductRating = async (productId: string) => {
  const [result] = await ReviewModel.aggregate([
    { $match: { product: new Types.ObjectId(productId) } },
    { $group: { _id: null, avgRating: { $avg: "$rating" } } },
  ]);

  if (result?.avgRating) {
    await ProductModel.findByIdAndUpdate(productId, {
      rating: result.avgRating,
    });
  }
};
