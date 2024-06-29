import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { AuthOptions, User } from "next-auth";
import { SignInCredentials } from "@/types";
import connectDB from "@/lib/connectDB";
import UserModel from "@/models/userModel";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as SignInCredentials;

        const { user, error } = await fetch(
          "http://localhost:3000/api/users/signin",
          {
            method: "POST",
            body: JSON.stringify({ email, password }),
          }
        ).then(async (res) => await res.json());

        if (error) return null;

        return {
          id: user.id,
          ...user,
        };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
