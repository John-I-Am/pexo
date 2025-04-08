import { UserPreferences } from '@prisma/client';
import prisma from '../../prisma';

export const getPreferenceByUserId = async (userId: string) => {
  try {
    const preference: UserPreferences | null = await prisma.userPreferences.findUnique({
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
