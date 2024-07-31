import { authOptions } from "@/auth";
import EmailVerificationBanner from "@/components/module/EmailVerificationBanner";
import ProfileForm from "@/components/module/ProfileForm";
import connectDB from "@/lib/connectDB";
import UserModel from "@/models/userModel";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const fetchUserProfile = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/signin");

  await connectDB();
  const user = await UserModel.findById(session.user.id);

  if (!user) return redirect("/signin");

  return {
    id: user._id.toString(),
    avatar: user.avatar?.url,
    email: user.email,
    name: user.name,
    verified: user.verified,
  };
};

async function Profile() {
  const userProfile = await fetchUserProfile();

  return (
    <div>
      <EmailVerificationBanner
        verified={userProfile.verified}
        id={userProfile.id}
      />
      <div className="flex py-4 space-y-4">
        <div className="border-r border-gray-700 p-4 space-y-4">
          <ProfileForm
            id={userProfile.id}
            email={userProfile.email}
            name={userProfile.name}
            avatar={userProfile.avatar}
          />
        </div>

        <div className="p-4 flex-1">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold uppercase opacity-70 mb-4">
              Your recent orders
            </h1>
            <Link href="/profile/orders" className="uppercase hover:underline">
              See all orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
