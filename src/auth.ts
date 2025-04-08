/* eslint-disable no-param-reassign */
import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { authConfig } from './auth.config';
import prisma from './app/api/prisma';
import { createPreferences } from './app/api/database/preferences/mutations';
import { createSessionLog } from './app/api/database/sessions/mutations';

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  session: {
    strategy: 'jwt',
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async jwt({ token, user, isNewUser }) {
      if (user) {
        token.id = user.id;
      }
      if (isNewUser) {
        await createPreferences(user.id as string);
      }
      await createSessionLog(token.id as any);
      return token;
    },
    // need to explicitly expose userId after modifiying jwt callback otherwise it won't be available
    async session({ session, token }: any) {
      session.user.id = token.id;
      return session;
    },
  },
});
