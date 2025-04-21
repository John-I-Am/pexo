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

export const getSessionLog = async (userId: string): Promise<SessionLog | null> => {
  const todayMidnightUTC = new Date(new Date().setUTCHours(0, 0, 0, 0));

  try {
    const sessionLog = await prisma.sessionLog.findFirst({
      where: {
        userId,
        date: {
          equals: todayMidnightUTC,
        },
      },
    });

    return sessionLog;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
