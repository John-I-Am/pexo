/* eslint-disable no-console */
import { UserPreference } from '@/generated/prisma';
import prisma from '../../prisma';

export const getPreferenceByUserId = async (userId: string) => {
  try {
    const preference: UserPreference | null = await prisma.userPreference.findUnique({
      where: {
        userId,
      },
    });
    return preference;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
