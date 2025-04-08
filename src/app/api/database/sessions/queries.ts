import { SessionLog } from '@prisma/client';
import prisma from '../../prisma';

export const getSessionLogs = async (userId: string) => {
  const sessionLogs = await prisma.sessionLog.findMany({
    where: {
      userId,
    },
  });

  return sessionLogs;
};

export const getCurrentDaySessionLog = async (userId: string): Promise<SessionLog | null> => {
  const currentDay = new Date(new Date().setUTCHours(0, 0, 0, 0));
  try {
    const currentDaySessionLog = await prisma.sessionLog.findFirst({
      where: {
        userId,
        day: {
          equals: currentDay,
        },
      },
    });

    return currentDaySessionLog;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
