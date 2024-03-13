import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "../database";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
    pages: {
        signIn: '/auth',
        signOut: '/auth',
        newUser: '/auth',
        verifyRequest: '/app',
        error: '/auth'
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        EmailProvider({
          server: process.env.EMAIL_SERVER,
          from: process.env.EMAIL_FROM
        }),
      ],
})