"use server";

import connectDB from "@/lib/connectDB";
import UserModel from "@/models/userModel";
import { UserProfileToUpdate } from "@/types";

export const updateUserProfile = async (info: UserProfileToUpdate) => {
  try {
    await connectDB();
    await UserModel.findByIdAndUpdate(info.id, {
      name: info.name,
      avatar: info.avatar,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
