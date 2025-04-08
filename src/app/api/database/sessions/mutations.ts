'use server';

import { revalidatePath } from 'next/cache';
import { SessionLog } from '@prisma/client';
import prisma from '../../prisma';
import { getCurrentDaySessionLog } from './queries';

export const createSessionLog = async (userId: string) => {
  const currentDay = new Date(new Date().setUTCHours(0, 0, 0, 0));
  try {
    const sessionLogs: SessionLog | null = await getCurrentDaySessionLog(userId);

    if (!sessionLogs) {
      await prisma.sessionLog.create({ data: { userId, day: currentDay } });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateSessionLog = async (id: string, goal: number) => {
  try {
    await prisma.sessionLog.update({
      where: {
        id,
      },
      data: { goal },
    });

    revalidatePath('/dashboard', 'page');
  } catch (error) {
    console.log(error);
    throw error;
  }
};
