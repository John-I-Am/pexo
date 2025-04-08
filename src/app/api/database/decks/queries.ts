import { Deck } from '@prisma/client';
import { auth } from '@/src/auth';
import prisma from '../../prisma';
import { DeckWithCards } from '@/src/prisma/types';
import { notFound } from 'next/navigation';

export const getDecks = async (): Promise<Deck[]> => {
  const session = await auth();
  try {
    const data = await prisma.deck.findMany({
      where: {
        authorId: session?.user?.id,
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
