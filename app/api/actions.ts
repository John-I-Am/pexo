/* eslint-disable consistent-return */

'use server';

import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { signIn, signOut } from '@/auth';

export async function authenticate(
  prevState: string | undefined,
  formData: any,
) {
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
    redirect('http://localhost:3000/login');
  } catch (error) {
    console.log(error);
  }
}
