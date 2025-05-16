/* eslint-disable no-console */
import { notFound } from 'next/navigation';
import { DeckWithCards } from '@/lib/prisma/types';
import prisma from '../../prisma';

export const getDecks = async (userId: string): Promise<DeckWithCards[]> => {
  try {
    const data: DeckWithCards[] = await prisma.deck.findMany({
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
