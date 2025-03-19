import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          // Add any additional fields you want to store from Google profile
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "",
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async session({ session, user }) {
      // Send properties to the client, like an access_token from a provider
      session.user.id = user.id;
      return session;
    }
  },
  events: {
    async createUser({ user }) {
      // Optional: Add any post-user creation logic here
      console.log(`New user created: ${user.email}`);
    }
  }
};