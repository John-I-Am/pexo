/* eslint-disable no-console */
'use server';

import { UserPreference } from '@/generated/prisma';
import prisma from '../../prisma';

export const createPreferences = async (userId: string) => {
  try {
    const preferences: UserPreference = await prisma.userPreference.create({
      data: {
        userId,
      },
    });
    return preferences;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
