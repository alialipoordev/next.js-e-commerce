import { authOptions } from "@/auth";
import ReviewForm from "@/components/module/ReviewForm";
import ReviewModel from "@/models/reviewModel";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const fetchReview = async (productId: string) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) return redirect("/signin");

  const review = await ReviewModel.findOne({
    userId: session.user.id,
    product: productId,
  }).populate<{
    product: {
      title: string;
      thumbnail: {
        url: string;
      };
    };
  }>({ path: "product", select: "title thumbnail.url" });

  if (review) {
    return {
      id: review._id.toString(),
      rating: review.rating,
      comment: review.comment,
      product: {
        title: review.product.title,
        thumbnail: review.product.thumbnail.url,
      },
    };
  }
};

export default async function Review({ params }: Props) {
  const productId = params.id;
  const review = await fetchReview(productId);

  const InitialValue = review
    ? { comment: review.comment || "", rating: review.rating }
    : undefined;

  return (
    <div className="max-w-screen-xl mx-auto p-2 space-y-4">
      <div className="flex items-center space-x-4">
        <Image
          src={review?.product.thumbnail || ""}
          width={50}
          height={50}
          alt={review?.product.title || "thumbnail"}
          className="rounded"
        />
        <h3 className="font-semibold">{review?.product.title}</h3>
      </div>
      <ReviewForm productId={productId} initialValue={InitialValue} />
    </div>
  );
}
