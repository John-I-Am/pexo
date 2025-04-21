import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@prisma/client';
import { magicLink } from 'better-auth/plugins';
import { transporter } from '../nodemailer/transporter';
import { mailOptions } from '../nodemailer/transporter';

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {
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
