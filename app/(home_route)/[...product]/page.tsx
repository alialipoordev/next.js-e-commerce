import ProductViewPage from "@/components/template/ProductViewPage";
import connectDB from "@/lib/connectDB";
import ProductModel from "@/models/productModel";
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
  });
};

const ProductDetails: React.FunctionComponent<ProductDetailsProps> = async ({
  params,
}) => {
  const { product } = params;
  const productId = product[1];
  const productInfo = JSON.parse(await fetchProduct(productId));
  let productImages = [productInfo.thumbnail];
  if (productInfo.images) {
    productImages = productImages.concat(productInfo.images);
  }

  return (
    <div className="p-4 mx-auto max-w-screen-xl">
      <ProductViewPage
        title={productInfo.title}
        description={productInfo.description}
        price={productInfo.price}
        sale={productInfo.sale}
        points={productInfo.bulletPoints}
        images={productImages}
      />

      <div className="py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold mb-2">Reviews</h1>
          <Link href={`add-review/${productInfo.id}`}>Add Review</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
