import ReviewForm from "@/components/module/ReviewForm";
import React from "react";

interface Props {
  params: { id: string };
}

export default function Review({ params }: Props) {
  const productId = params.id;

  return (
    <div className="max-w-screen-xl mx-auto p-2">
      <ReviewForm productId={productId} />
    </div>
  );
}
