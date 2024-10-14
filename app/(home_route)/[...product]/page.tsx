import ReviewsList from "@/components/module/ReviewsList";
import ProductViewPage from "@/components/template/ProductViewPage";
import connectDB from "@/lib/connectDB";
import ProductModel from "@/models/productModel";
import ReviewModel from "@/models/reviewModel";
import { isValidObjectId } from "mongoose";
import Link from "next/link";
import { redirect } from "next/navigation";
import * as React from "react";

interface ProductDetailsProps {
  params: {
    product: string[];
  };
}

const fetchProduct = async (productId: string) => {
  if (!isValidObjectId(productId)) return redirect("/404");
  await connectDB();

  const product = await ProductModel.findById(productId);
  if (!product) return redirect("/404");

  return JSON.stringify({
    id: product._id.toString(),
    title: product.title,
    description: product.description,
    thumbnail: product.thumbnail.url,
    images: product.images?.map(({ url }) => url),
    bulletPoints: product.bulletPoints,
    price: product.price,
    sale: product.sale,
    rating: product.rating,
    outOfStuck: product.quantity <= 0,
  });
};

const fetchProductReviews = async (productId: string) => {
  await connectDB();

  const reviews = await ReviewModel.find({ product: productId }).populate<{
    userId: { name: String; _id: string; avatar?: { url: string } };
  }>({
    path: "userId",
    select: "name avatar.url",
  });

  const result = reviews.map((review) => ({
    id: review._id.toString(),
    comment: review.comment,
    rating: review.rating,
    date: review.createdAt,
    userInfo: {
      id: review.userId._id.toString(),
      name: review.userId.name,
      avatar: review.userId.avatar?.url,
    },
  }));

  return JSON.stringify(result);
};

const fetchSimilarProduct = async () => {
  await connectDB();
  const products = await ProductModel.find().sort({ rating: -1 }).limit(10);
  return products.map(({ _id, thumbnail, title, price }) => {
    return {
      id: _id.toString(),
      title,
      price: price.discounted,
      thumbnail: thumbnail.url,
    };
  });
};

const ProductDetails: React.FunctionComponent<ProductDetailsProps> = async ({
  params,
}) => {
  const productId = params.product[1];
  const productInfo = JSON.parse(await fetchProduct(productId));
  let productImages = [productInfo.thumbnail];
  if (productInfo.images) {
    productImages = productImages.concat(productInfo.images);
  }

  const reviews = await fetchProductReviews(productId);
  const similarProduct = await fetchSimilarProduct();
  console.log(similarProduct);

  return (
    <div className="p-4 mx-auto max-w-screen-xl">
      <ProductViewPage
        title={productInfo.title}
        description={productInfo.description}
        price={productInfo.price}
        sale={productInfo.sale}
        points={productInfo.bulletPoints}
        images={productImages}
        rating={productInfo.rating}
        outOfStuck={productInfo.outOfStuck}
      />

      <div className="py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold mb-2">Reviews</h1>
          <Link href={`add-review/${productInfo.id}`}>Add Review</Link>
        </div>
      </div>

      <ReviewsList reviews={JSON.parse(reviews)} />
    </div>
  );
};

export default ProductDetails;
