import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";

const authOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
  ],
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
