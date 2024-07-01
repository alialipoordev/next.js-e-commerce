import connectDB from "@/lib/connectDB";
import PasswordResetToken from "@/models/passwordResetToken";
import UserModel from "@/models/userModel";
import { UpdatePasswordRequest } from "@/types";
import sendMail from "@/utils/sendMail";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async (req: Request) => {
  try {
    await connectDB();

    const { password, token, userId } =
      (await req.json()) as UpdatePasswordRequest;

    if (!password || !token || !isValidObjectId(userId))
      return NextResponse.json(
        {
          error: "Invalid request!",
        },
        {
          status: 401,
        }
      );

    const resetToken = await PasswordResetToken.findOne({ user: userId });
    if (!resetToken)
      return NextResponse.json(
        { error: "Unauthorized request!" },
        { status: 401 }
      );

    const tokenMatched = await resetToken.compareToken(token);
    if (!tokenMatched)
      return NextResponse.json(
        { error: "Unauthorized request!" },
        { status: 401 }
      );

    const user = await UserModel.findById(userId);
    if (!user)
      return NextResponse.json(
        { error: "User doesn't exist!" },
        { status: 404 }
      );

    const passwordMatched = await user.comparePassword(password);
    if (passwordMatched)
      return NextResponse.json(
        { error: "New password must be different!" },
        { status: 401 }
      );

    user.password = password;
    await user.save();

    await PasswordResetToken.findByIdAndDelete(resetToken._id);

    await sendMail({
      profile: { name: user.name, email: user.email },
      subject: "password-changed",
    });

    return NextResponse.json({ message: "your password is changed" });
  } catch (error) {
    return NextResponse.json(
      {
        error: "could not verify email, something went wrong!",
      },
      { status: 500 }
    );
  }
};
