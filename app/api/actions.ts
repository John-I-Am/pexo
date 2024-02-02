/* eslint-disable consistent-return */

'use server';

import { AuthError } from 'next-auth';
import { auth, signIn, signOut } from '@/auth';
import prisma from './prisma';

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

export async function unauthenticate() {
  try {
    await signOut();
  } catch (error) {
    console.log(error);
  }
}
