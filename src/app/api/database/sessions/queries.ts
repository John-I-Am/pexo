/* eslint-disable no-console */
import dayjs from '@/lib/dayjs';
import { SessionLog } from '@/generated/prisma';
import prisma from '../../prisma';

export const getSessionLogs = async (userId: string) => {
  const sessionLogs = await prisma.sessionLog.findMany({
    where: {
      userId,
    },
  });

  return sessionLogs;
};

export const getSessionLog = async (
  userId: string,
  localDate: Date
): Promise<SessionLog | null> => {
  const localDateToUTC = dayjs(localDate).utc().toDate();

  try {
    const sessionLog = await prisma.sessionLog.findUnique({
      where: {
        userId_date: {
          userId,
          date: localDateToUTC,
        },
      },
    });

    return sessionLog;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
