'use server';

import { revalidatePath } from 'next/cache';
import prisma from '../../prisma';

export const upsertSessionLog = async (userId: string, goal: number | undefined) => {
  const todayMidnightUTC = new Date(new Date().setUTCHours(0, 0, 0, 0));

  try {
    await prisma.sessionLog.upsert({
      where: {
        userId_date: {
          userId,
          date: todayMidnightUTC,
        },
      },
      update: {
        ...(goal !== undefined && { goal }),
      },
      create: {
        userId,
        date: todayMidnightUTC,
      },
    });

    revalidatePath('/dashboard');
  } catch (error) {
    console.error('Failed to upsert session log:', error);
    throw error;
  }
};
