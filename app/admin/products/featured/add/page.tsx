import FeaturedProductForm from "@/components/module/FeaturedProductForm";
import FeaturedProductTable from "@/components/module/FeaturedProductTable";
import connectDB from "@/lib/connectDB";
import FeaturedProductModel from "@/models/featuredProduct";
import React from "react";

const fetchFeaturedProducts = async () => {
  await connectDB();
  const products = await FeaturedProductModel.find();

  return products.map(({ _id, title, link, linkTitle, banner }) => {
    return {
      id: _id.toString(),
      title,
      linkTitle,
      link,
      banner: banner.url,
    };
  });
};

async function AddFeaturedProduct() {
  const featuredProducts = await fetchFeaturedProducts();

  return (
    <div>
      <FeaturedProductForm />
      <FeaturedProductTable products={featuredProducts} />
    </div>
  );
}

export default AddFeaturedProduct;
