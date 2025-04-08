/* eslint-disable consistent-return */

'use server';

import { AuthError } from 'next-auth';
import { signIn } from '@/src/auth';

export async function authenticate(prevState: string | undefined, formData: any) {
  try {
    await signIn('email', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid Credentials,';
        default:
          return 'Something went wrong';
      }
    }
    throw error;
  }
}
