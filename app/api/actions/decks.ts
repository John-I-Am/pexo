/* eslint-disable consistent-return */

'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import prisma from '../prisma';

export async function fetchDecks() {
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
  }
}

export async function fetchDeckById(id: string) {
  try {
    const deck = await prisma.deck.findUnique({
      where: {
        id,
      },
      include: {
        cards: true,
      },
    });
    return deck;
  } catch (error) {
    console.log(error);
  }
}

export async function createDeck() {
  const session = await auth();
  try {
    await prisma.deck.create({
      data: {
        title: 'untitled',
        authorId: session?.user?.id as string,
      },
    });

    revalidatePath('/dashboard/decks');
  } catch (error) {
    console.log(error);
  }
}

export async function deleteDeck(id: string) {
  try {
    await prisma.deck.delete({
      where: {
        id,
      },
    });

    revalidatePath('/dashboard/decks');
  } catch (error) {
    console.log(error);
  }
}
