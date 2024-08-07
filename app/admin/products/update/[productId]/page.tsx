import React from "react";
import UpdateProductPage from "@/components/template/UpdateProductPage";
import { isValidObjectId } from "mongoose";
import { redirect } from "next/navigation";
import connectDB from "@/lib/connectDB";
import ProductModel from "@/models/productModel";
import { ProductResponse } from "@/types";

interface UpdatePageProps {
  params: { productId: string };
}

const fetchProductInfo = async (productId: string): Promise<string> => {
  if (!isValidObjectId(productId)) return redirect("/404");

  await connectDB();
  const product = await ProductModel.findById(productId);
  if (!product) return redirect("/404");

  const finalProduct: ProductResponse = {
    id: product._id.toString(),
    title: product.title,
    description: product.description,
    quantity: product.quantity,
    price: product.price,
    bulletPoints: product.bulletPoints,
    images: product.images?.map(({ url, id }) => ({ url, id })),
    thumbnail: product.thumbnail,
    category: product.category,
  }

  return JSON.stringify(finalProduct)
};

async function UpdatePage({ params: { productId } }: UpdatePageProps) {
  const product = await fetchProductInfo(productId);

  return <UpdateProductPage product={JSON.parse(product)} />;
}

export default UpdatePage;
