"use server";

import connectDB from "@/lib/connectDB";
import FeaturedProductModel from "@/models/featuredProduct";
import { FeaturedProductUpdate, NewFeaturedProduct } from "@/types";
import { removeImageFromCloud } from "../action";

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

export const deleteFeaturedProduct = async (id: string) => {
  try {
    await connectDB();
    const product = await FeaturedProductModel.findByIdAndDelete(id);
    if (product) {
      await removeImageFromCloud(product.banner.id);
    }
  } catch (error) {
    throw error;
  }
};
