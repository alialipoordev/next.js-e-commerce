import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { AuthOptions } from "next-auth";
import { SignInCredentials } from "@/types";

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
  callbacks: {
    async jwt(params) {
      if (params.user) {
        params.token.user = params.user;
      }
      return params.token;
    },
    async session(params) {
      const user = params.token.user;
      if (user) {
        params.session.user = { ...params.session.user, ...user };
      }
      return params.session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
