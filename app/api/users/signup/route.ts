import connectDB from "@/lib/connectDB";
import UserModel from "@/models/userModel";
import { NewUserRequest } from "@/types";
import { NextResponse } from "next/server";
import crypto from "crypto";
import EmailVerificationToken from "@/models/emailVerificationToken";
import sendMail from "@/utils/sendMail";

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

    const verificationUrl = `${process.env.VERIFICATION_URL}?token=${token}&userId=${newUser._id}`;

    await sendMail({
      profile: { name: newUser.name, email: newUser.email },
      subject: "verification",
      linkUrl: verificationUrl,
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
