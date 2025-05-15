/* eslint-disable no-console */
'use server';

import dayjs from '@/lib/dayjs';
import { revalidatePath } from 'next/cache';
import { SessionLog } from '@prisma/client';
import prisma from '../../prisma';

export const upsertSessionLog = async (
  userId: string,
  localDate: Date,
  goal?: number
): Promise<SessionLog> => {
  const localDateToUTC = dayjs(localDate).utc().toDate();

  try {
    const session = await prisma.sessionLog.upsert({
      where: {
        userId_date: {
          userId,
          date: localDateToUTC,
        },
      },
      update: {
        ...(goal !== undefined && { goal }),
      },
      create: {
        userId,
        date: localDateToUTC,
      },
    });

    revalidatePath('/dashboard');
    return session;
  } catch (error) {
    console.error('Failed to upsert session log:', error);
    throw error;
  }
};
