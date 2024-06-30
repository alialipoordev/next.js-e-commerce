import connectDB from "@/lib/connectDB";
import PasswordResetToken from "@/models/passwordResetToken";
import UserModel from "@/models/userModel";
import { ForgotPasswordRequest } from "@/types";
import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";

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

    const resetPasswordUrl = `http://localhost:3000/reset-password?token=${token}&userId=${user._id}`;

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "3121861414a3d9",
        pass: "bc8c64e5b61b9e",
      },
    });

    transport.sendMail({
      from: "verification@nextecom.com",
      to: user.email,
      html: `<h1>click on <a href=${resetPasswordUrl}>this link</a> to reset your password</h1>`,
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
