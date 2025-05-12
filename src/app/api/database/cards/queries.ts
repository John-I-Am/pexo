/* eslint-disable no-console */
import { notFound } from 'next/navigation';
import { Card } from '@prisma/client';
import prisma from '../../prisma';

export const getCardsByUserId = async (userId: string): Promise<Card[]> => {
  const userWithCards = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      decks: {
        include: {
          cards: true,
        },
      },
    },
  });

  const allCards = userWithCards?.decks.flatMap((deck) => deck.cards) || [];
  return allCards;
};

export const getCardsByDeckId = async (deckId: string): Promise<Card[]> => {
  try {
    const cards = await prisma.card.findMany({
      where: {
        deckId,
      },
    });

    return cards;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCardById = async (id: string): Promise<Card> => {
  try {
    const card = await prisma.card.findUnique({
      where: {
        id,
      },
    });

    if (!card) {
      notFound();
    }

    return card;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
