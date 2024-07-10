"use client";

import { NewProductInfo, ProductResponse, ProductToUpdate } from "@/types";
import React from "react";
import ProductFormPage, { InitialValue } from "./ProductFormPage";
import {
  removeAndUpdateProductImage,
  removeImageFromCloud,
  updateProduct,
} from "@/app/admin/products/action";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateProductInfoSchema } from "@/utils/validationSchema";
import { uploadImage } from "@/utils/helper";

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
    await removeAndUpdateProductImage(product.id, publicId);
  };

  const handleOnSubmit = async (values: NewProductInfo) => {
    try {
      const { thumbnail, images } = values;
      await updateProductInfoSchema.validate(values, { abortEarly: false });

      const dataToUpdate: ProductToUpdate = {
        title: values.title,
        description: values.description,
        bulletPoints: values.bulletPoints,
        category: values.category,
        quantity: values.quantity,
        price: {
          base: values.mrp,
          discounted: values.salePrice,
        },
      };

      if (thumbnail) {
        await removeImageFromCloud(product.thumbnail.id);
        dataToUpdate.thumbnail = await uploadImage(thumbnail);
      }

      if (images.length) {
        const uploadPromise = images.map(async (imgFile) => {
          return await uploadImage(imgFile);
        });
        dataToUpdate.images = await Promise.all(uploadPromise);
      }

      await updateProduct(product.id, dataToUpdate);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.map((err) => {
          toast.error(err.errors[0]);
        });
      }
    }
  };

  return (
    <ProductFormPage
      initialValue={initialValue}
      onImageRemove={handleImageRemove}
      onSubmit={handleOnSubmit}
    />
  );
}

export default UpdateProductPage;
