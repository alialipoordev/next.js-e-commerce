import connectDB from "@/lib/connectDB";
import UserModel from "@/models/userModel";
import { SignInCredentials } from "@/types";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { email, password } = (await req.json()) as SignInCredentials;

    if (!email || !password)
      return NextResponse.json({
        error: "Invalid request, email/password mismatch!",
      });

    await connectDB();

    const user = await UserModel.findOne({ email });
    if (!user) return NextResponse.json({ error: "email/password mismatch!" });

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) throw new Error("email/password mismatch!");

    return NextResponse.json({
      user: {
        id: String(user._id),
        name: user.name,
        avatar: user.avatar?.url,
        role: user.role,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error In Connecting To DB!" },
      { status: 500 }
    );
  }
};
