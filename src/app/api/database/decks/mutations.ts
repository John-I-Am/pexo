'use server';

import { revalidatePath } from 'next/cache';
import { Deck } from '@prisma/client';
import { auth } from '@/lib/betterAuth/auth';
import { headers } from 'next/headers';
import prisma from '../../prisma';

export const createDeck = async (): Promise<Deck> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  try {
    const result = await prisma.deck.create({
      data: {
        title: 'untitled',
        authorId: session?.user?.id as string,
      },
    });

    revalidatePath('/dashboard/decks');
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateDeck = async (
  id: string,
  data: { title: string | undefined; tags: string[] | undefined }
) => {
  try {
    await prisma.deck.update({
      where: {
        id,
      },
      data,
    });

    revalidatePath('/dashboard/decks');
  } catch (error) {
    console.log(error);
  }
};

export const deleteDeck = async (id: string) => {
  try {
    const result = await prisma.deck.delete({
      where: {
        id,
      },
    });

    revalidatePath('/dashboard/decks');
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
