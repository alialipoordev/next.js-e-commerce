import { ProductResponse } from "@/types";
import React from "react";
import ProductFormPage, { InitialValue } from "./ProductFormPage";

interface UpdateProductPageProps {
  product: ProductResponse;
}

function UpdateProductPage({ product }: UpdateProductPageProps) {
  const initialValue: InitialValue = {
    ...product,
    mrp: product.price.base,
    salePrice: product.price.discounted,
    thumbnail: product.thumbnail.url,
    images: product.images?.map(({ url }) => url),
    bulletPoints: product.bulletPoints || [],
  };

  return <ProductFormPage initialValue={initialValue} />;
}

export default UpdateProductPage;
