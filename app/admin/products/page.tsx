import ProductTable from "@/components/module/ProductTable";
import React from "react";
import type { Product } from "./../../../components/module/ProductTable";
import connectDB from "@/lib/connectDB";
import ProductModel from "@/models/productModel";

const fetchProducts = async (
  pageNo: number,
  perPage: number
): Promise<Product[]> => {
  const skipCount = (pageNo - 1) * perPage;

  await connectDB();
  const products = await ProductModel.find()
    .sort("-createdAt")
    .skip(skipCount)
    .limit(perPage);

  return products.map((product) => {
    return {
      id: product._id.toString(),
      title: product.title,
      thumbnail: product.thumbnail.url,
      description: product.description,
      price: {
        mrp: product.price.base,
        salePrice: product.price.discounted,
        saleOff: product.sale,
      },
      category: product.category,
      quantity: product.quantity,
    };
  });
};

async function Products() {
  const products = await fetchProducts(1, 10);
  return (
    <div>
      <ProductTable products={products} />
    </div>
  );
}

export default Products;
