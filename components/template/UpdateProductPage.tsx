"use client";

import { ProductResponse } from "@/types";
import React from "react";
import ProductFormPage, { InitialValue } from "./ProductFormPage";
import { removeAndUpdateProductImage } from "@/app/admin/products/action";

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

  const handleImageRemove = async (source: string) => {
    const splittedData = source.split("/");
    const lastItem = splittedData[splittedData.length - 1];
    const publicId = lastItem.split(".")[0];
    await removeAndUpdateProductImage(product.id, publicId)
  };

  return (
    <ProductFormPage
      initialValue={initialValue}
      onImageRemove={handleImageRemove}
      onSubmit={(values) => {
        console.log(values);
      }}
    />
  );
}

export default UpdateProductPage;
