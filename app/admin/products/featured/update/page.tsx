import FeaturedProductForm from "@/components/module/FeaturedProductForm";
import connectDB from "@/lib/connectDB";
import FeaturedProductModel from "@/models/featuredProduct";
import { isValidObjectId } from "mongoose";
import { redirect } from "next/navigation";
import React from "react";

interface UpdateFeaturedProductProps {
  searchParams: { id: string };
}

const fetchFeaturedProduct = async (id: string) => {
  if (!isValidObjectId(id)) return redirect("/404");

  await connectDB();
  const product = await FeaturedProductModel.findById(id);
  if (!product) return redirect("/404");
  const { _id, link, linkTitle, banner, title } = product;

  return {
    id: _id.toString(),
    link,
    title,
    banner: banner.url,
    linkTitle,
  };
};

async function UpdateFeaturedProduct({
  searchParams: { id },
}: UpdateFeaturedProductProps) {
  const product = await fetchFeaturedProduct(id);

  return <FeaturedProductForm initialValue={product} />;
}

export default UpdateFeaturedProduct;
