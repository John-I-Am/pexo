/* eslint-disable consistent-return */

'use server';

import { revalidatePath } from 'next/cache';
import prisma from '../prisma';

export async function fetchCards(deckId: string) {
  try {
    const cards = await prisma.card.findMany({
      where: {
        deckId,
      },
    });
    return cards;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchCardById(id: string) {
  try {
    const card = await prisma.card.findUnique({
      where: {
        id,
      },
    });
    return card;
  } catch (error) {
    console.log(error);
  }
}

export async function createCard(deckId: string, front: string, back: string) {
  try {
    await prisma.card.create({
      data: {
        deckId,
        front,
        back,
      },
    });
    revalidatePath('/dashboard/decks/[id]');
  } catch (error) {
    console.log(error);
  }
}

export async function deleteCard(id: string) {
  try {
    await prisma.card.delete({
      where: {
        id,
      },
    });
    revalidatePath('/dashboard/decks/[id]');
  } catch (error) {
    console.log(error);
  }
}
