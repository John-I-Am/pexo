/* eslint-disable no-console */
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { magicLink } from 'better-auth/plugins';
import Prisma from '@/app/api/prisma';
import { mailOptions, transporter } from '../nodemailer/transporter';

const prisma = Prisma;
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }, _request) => {
        const magicLink = `${url}?token=${token}`;
        const payload = mailOptions(email, magicLink);

        try {
          await transporter.sendMail(payload);
          console.log(`Magic link sent to ${email}`);
        } catch (err) {
          console.error('Error sending email:', err);
        }
      },
    }),
  ],
});
