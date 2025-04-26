import { Deck } from '@prisma/client';
import prisma from '../../prisma';
import { DeckWithCards } from '@/src/lib/prisma/types';
import { notFound } from 'next/navigation';

export const getDecks = async (userId: string): Promise<Deck[]> => {
  try {
    const data = await prisma.deck.findMany({
      where: {
        authorId: userId,
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
