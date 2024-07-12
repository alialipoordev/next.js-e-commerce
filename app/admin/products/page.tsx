import ProductTablePage from "@/components/template/ProductTablePage";
import React from "react";
import type { Product } from "../../../components/template/ProductTablePage";
import connectDB from "@/lib/connectDB";
import ProductModel from "@/models/productModel";
import { redirect } from "next/navigation";

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

interface ProductsProps {
  searchParams: { page: string };
}

const PRODUCTS_PER_PAGE = 10;

async function Products({ searchParams }: ProductsProps) {
  const { page = "1" } = searchParams;
  const products = await fetchProducts(+page, PRODUCTS_PER_PAGE);
  let hasMore = true;
  
  if (isNaN(+page)) return redirect("/404");

  if (products.length < PRODUCTS_PER_PAGE) hasMore = false;
  else hasMore = true;

  return (
    <div>
      <ProductTablePage
        products={products}
        currentPageNo={+page}
        hasMore={hasMore}
      />
    </div>
  );
}

export default Products;
