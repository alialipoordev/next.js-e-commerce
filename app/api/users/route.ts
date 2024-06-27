import connectDB from "@/lib/connectDB";
import UserModel from "@/models/userModel";
import { NewUserRequest } from "@/types";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";
import EmailVerificationToken from "@/models/emailVerificationToken";

export const POST = async (req: Request) => {
  try {
    await connectDB();

    const { name, email, password } = (await req.json()) as NewUserRequest;

    const newUser = await UserModel.create({
      name,
      email,
      password,
    });

    const token = crypto.randomBytes(36).toString("hex");
    await EmailVerificationToken.create({
      user: newUser._id,
      token,
    });

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "3121861414a3d9",
        pass: "bc8c64e5b61b9e",
      },
    });

    const verificationUrl = `http://localhost:3000/verify?token=${token}&userId=${newUser._id}`;

    transport.sendMail({
      from: "verification@nextecom.com",
      to: newUser.email,
      html: `<h1>please verify email by clicking on <a href=${verificationUrl}>this link</a></h1>`,
    });

    return NextResponse.json(
      { message: "please check your email! " },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
};
