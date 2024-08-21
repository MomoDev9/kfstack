import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const authOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),

    CredentialsProvider({
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return user;
        } else {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
