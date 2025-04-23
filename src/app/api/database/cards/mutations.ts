/* eslint-disable consistent-return */

'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Card } from '@prisma/client';
import prisma from '../../prisma';
import { deckPath } from '@/src/lib/paths';
import { setCookieByKey } from '../../cookies';
import { upsertSessionLog } from '../sessions/mutations';
import { headers } from 'next/headers';
import { auth } from '@/src/lib/betterAuth/auth';

export const upsertCard = async (
  deckId: string,
  id: string | undefined,
  front: string,
  back: string,
  audioUrl: string = ''
): Promise<Card> => {
  try {
    const data = { deckId, front, back, audioUrl };
    await prisma.card.upsert({
      where: {
        id: id || '',
      },
      update: data,
      create: data,
    });
  } catch (error) {
    console.log(error);
  }

  if (id) {
    setCookieByKey('notification', 'Card edited!');
  } else {
    setCookieByKey('notification', 'Card created!');
  }

  revalidatePath(deckPath(deckId));
  redirect(deckPath(deckId));
};

export const updateCardLevel = async (id: string, level: number, isCorrect: boolean) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let newLevel = isCorrect ? (level === 5 ? 5 : level + 1) : level === 1 ? 1 : level - 1;

  const timeIntervals: any = {
    1: 15 * 60000, // 15 minutes
    2: 120 * 60000, // 2 hours
    3: 480 * 60000, // 8 hours
    4: 1440 * 60000, // 1 day
    5: 4320 * 60000, // 3 days
  };

  const interval = timeIntervals[newLevel] || 0;

  try {
    const result = await prisma.card.update({
      where: { id },
      data: {
        level: newLevel,
        nextReview: new Date(Date.now() + interval),
      },
    });

    if (session) {
      await upsertSessionLog(session?.user.id, 50);
    }

    revalidatePath(deckPath(result.deckId));

    return result;
  } catch (error) {
    console.error('Error updating card:', error);
    return null;
  }
};

export const deleteCard = async (id: string) => {
  let card;
  try {
    card = await prisma.card.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }

  if (card) {
    setCookieByKey('notification', 'Card deleted!'); // TODO fix notification not showing on deck page
    revalidatePath(deckPath(id));
    redirect(deckPath(card.deckId));
  }
};
