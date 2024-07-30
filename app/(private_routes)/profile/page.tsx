import { authOptions } from "@/auth";
import EmailVerificationBanner from "@/components/module/EmailVerificationBanner";
import ProfileForm from "@/components/module/ProfileForm";
import connectDB from "@/lib/connectDB";
import UserModel from "@/models/userModel";
import { getServerSession } from "next-auth";
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
      <div>
        <ProfileForm
          avatar={userProfile.avatar}
          email={userProfile.email}
          id={userProfile.id}
          name={userProfile.name}
        />
      </div>
    </div>
  );
}

export default Profile;
