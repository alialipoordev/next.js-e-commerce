"use server"

import connectDB from "@/lib/connectDB";
import FeaturedProductModel from "@/models/featuredProduct";
import { NewFeaturedProduct } from "@/types";

export const createFeaturedProduct = async (info: NewFeaturedProduct) => {
  try {
    await connectDB();
    await FeaturedProductModel.create({ ...info });
  } catch (error) {
    throw error;
  }
};
