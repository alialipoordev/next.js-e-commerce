"use server";

import connectDB from "@/lib/connectDB";
import FeaturedProductModel from "@/models/featuredProduct";
import { FeaturedProductUpdate, NewFeaturedProduct } from "@/types";

export const createFeaturedProduct = async (info: NewFeaturedProduct) => {
  try {
    await connectDB();
    await FeaturedProductModel.create({ ...info });
  } catch (error) {
    throw error;
  }
};

export const updateFeaturedProduct = async (
  id: string,
  info: FeaturedProductUpdate
) => {
  try {
    await connectDB();
    await FeaturedProductModel.findByIdAndUpdate(id, { ...info });
  } catch (error) {
    throw error;
  }
};
