"use client";

import ProductForm from "@/components/module/ProductForm";
import { NewProductInfo } from "@/types";
import { uploadImage } from "@/utils/helper";
import { newProductInfoSchema } from "@/utils/validationSchema";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

function Create() {
  const handleCreateProduct = async (values: NewProductInfo) => {
    try {
      // await newProductInfoSchema.validate(values, { abortEarly: false });
      await uploadImage(values.thumbnail!);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.map((err) => {
          toast.error(err.errors[0]);
        });
      }
    }
  };

  return <ProductForm onSubmit={handleCreateProduct} />;
}

export default Create;
