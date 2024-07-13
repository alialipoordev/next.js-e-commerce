"use server";

import connectDB from "@/lib/connectDB";
import ProductModel, { NewProduct } from "@/models/productModel";
import { ProductToUpdate } from "@/types";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const getCloudConfig = async () => {
  return {
    name: process.env.CLOUDINARY_CLOUD_NAME!,
    key: process.env.CLOUDINARY_API_KEY!,
  };
};

// generate cloud signature
export const getCloudSignature = async () => {
  const secret = cloudinary.config().api_secret!;

  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request({ timestamp }, secret);

  return { timestamp, signature };
};

export const createProduct = async (info: NewProduct) => {
  try {
    await connectDB();
    await ProductModel.create({ ...info });
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Something went wrong, can not create product!");
  }
};

export const removeImageFromCloud = async (publicId: string) => {
  await cloudinary.uploader.destroy(publicId);
};

export const removeAndUpdateProductImage = async (
  id: string,
  publicId: string
) => {
  try {
    const { result } = await cloudinary.uploader.destroy(publicId);
    if (result === "ok") {
      await connectDB();
      await ProductModel.findByIdAndUpdate(id, {
        $pull: { images: { id: publicId } },
      });
    }
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};

export const updateProduct = async (
  id: string,
  productInfo: ProductToUpdate
) => {
  try {
    await connectDB();

    let images: typeof productInfo.images = [];
    if (productInfo.images) {
      images = productInfo.images;
    }

    delete productInfo.images;
    await ProductModel.findByIdAndUpdate(id, {
      ...productInfo,
      $push: { images },
    });
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};
