'use server';

import { UserPreferences } from '@prisma/client';
import prisma from '../../prisma';

export const createPreferences = async (userId: string) => {
  try {
    const preferences: UserPreferences = await prisma.userPreferences.create({
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
