import { Deck } from '@prisma/client';
import { auth } from '@/src/lib/betterAuth/auth';
import { headers } from 'next/headers';
import prisma from '../../prisma';
import { DeckWithCards } from '@/src/lib/prisma/types';
import { notFound } from 'next/navigation';

export const getDecks = async (): Promise<Deck[]> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  try {
    const data = await prisma.deck.findMany({
      where: {
        authorId: session?.user?.id,
      },
      include: {
        cards: true,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getDeckById = async (id: string): Promise<DeckWithCards> => {
  try {
    const deck = await prisma.deck.findUnique({
      where: {
        id,
      },
      include: {
        cards: true,
      },
    });

    if (!deck) {
      notFound();
    }

    return deck;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
