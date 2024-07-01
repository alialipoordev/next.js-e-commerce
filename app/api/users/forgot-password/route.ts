import connectDB from "@/lib/connectDB";
import PasswordResetToken from "@/models/passwordResetToken";
import UserModel from "@/models/userModel";
import { ForgotPasswordRequest } from "@/types";
import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
import sendMail from "@/utils/sendMail";

export const POST = async (req: Request) => {
  try {
    const { email } = (await req.json()) as ForgotPasswordRequest;

    if (!email)
      return NextResponse.json(
        {
          error: "Invalid Data!",
        },
        { status: 401 }
      );

    await connectDB();

    const user = await UserModel.findOne({ email });
    if (!user)
      return NextResponse.json(
        {
          error: "user doesn't exist!",
        },
        { status: 404 }
      );

    await PasswordResetToken.findOneAndDelete({ user: user._id });
    const token = crypto.randomBytes(36).toString("hex");
    await PasswordResetToken.create({
      user: user._id,
      token,
    });

    const resetPasswordUrl = `${process.env.PASSWORD_RESET_URL}?token=${token}&userId=${user._id}`;

    await sendMail({
      profile: { name: user.name, email: user.email },
      subject: "forgot-password",
      linkUrl: resetPasswordUrl,
    });

    return NextResponse.json(
      { message: "please check your email! " },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error In Connecting To DB!" },
      { status: 500 }
    );
  }
};
