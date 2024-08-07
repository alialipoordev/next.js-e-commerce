"use client";

import ProductFormPage from "@/components/template/ProductFormPage";
import { NewProductInfo } from "@/types";
import { uploadImage } from "@/utils/helper";
import { newProductInfoSchema } from "@/utils/validationSchema";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { createProduct } from "../action";
import { useRouter } from "next/navigation";

function Create() {
  const router = useRouter();

  const handleCreateProduct = async (values: NewProductInfo) => {
    try {
      const { thumbnail, images } = values;
      await newProductInfoSchema.validate(values, { abortEarly: false });
      const thumbnailRes = await uploadImage(thumbnail!);

      let productImages: { url: string; id: string }[] = [];
      if (images) {
        const uploadPromise = images.map(async (imageFile) => {
          const { url, id } = await uploadImage(imageFile);
          return { url, id };
        });

        productImages = await Promise.all(uploadPromise);
      }

      await createProduct({
        ...values,
        price: {
          base: values.mrp,
          discounted: values.salePrice,
        },
        images: productImages,
        thumbnail: thumbnailRes,
      });

      router.refresh()
      router.push("/admin/products");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.map((err) => {
          toast.error(err.errors[0]);
        });
      }
    }
  };

  return <ProductFormPage onSubmit={handleCreateProduct} />;
}

export default Create;
