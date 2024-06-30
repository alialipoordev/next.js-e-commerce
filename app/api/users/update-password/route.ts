import connectDB from "@/lib/connectDB";
import PasswordResetToken from "@/models/passwordResetToken";
import UserModel from "@/models/userModel";
import { UpdatePasswordRequest } from "@/types";
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

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "3121861414a3d9",
        pass: "bc8c64e5b61b9e",
      },
    });

    await transport.sendMail({
      from: "verification@nextecom.com",
      to: user.email,
      html: `<h1>your password is changed.</h1>`,
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
