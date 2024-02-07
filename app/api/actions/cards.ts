/* eslint-disable consistent-return */

'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
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
    revalidatePath('/dashboard/decks/[deckId]', 'page');
  } catch (error) {
    console.log(error);
  }
  redirect(`/dashboard/decks/${deckId}`); // DO NOT PLACE IN TRY/CATCH: nextjs internal bug
}

export async function updateCard(id: string, updatedCard: any) {
  let card;
  try {
    card = await prisma.card.update({
      where: {
        id,
      },
      data: { ...updatedCard },
    });
    revalidatePath('/dashboard/decks/[deckId]', 'page');
  } catch (error) {
    console.log(error);
  }
  redirect(`/dashboard/decks/${card?.deckId}`); // DO NOT PLACE IN TRY/CATCH: nextjs internal bug
}

export async function deleteCard(id: string) {
  let card;
  try {
    card = await prisma.card.delete({
      where: {
        id,
      },
    });
    revalidatePath('/dashboard/decks/[deckId]', 'page');
  } catch (error) {
    console.log(error);
  }
  redirect(`/dashboard/decks/${card?.deckId}`); // DO NOT PLACE IN TRY/CATCH: nextjs internal bug
}
