"use server";

import connectDB from "@/lib/connectDB";
import ProductModel, { NewProduct } from "@/models/productModel";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const getCloudConfig = () => {
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
