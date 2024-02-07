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

export async function updateCard(id: string, updatedCard: any, redirectUrl: boolean) {
  const card: any = await fetchCardById(id);

  const reviewDate: number = card.nextReview.getTime();
  let interval = 0;

  if (updatedCard.level || updatedCard.level === 0) {
    // formula for adding time: min * 60000
    switch (updatedCard.level) {
      case 0:
        // 15 minutes
        interval = 15 * 60000;
        break;
      case 1:
        // 2 hours
        interval = 120 * 60000;
        break;
      case 2:
        // 8 hours
        interval = 480 * 60000;
        break;
      case 3:
        // 1 day
        interval = 1440 * 60000;
        break;
      case 4:
        // 3 days
        interval = 4320 * 60000;
        break;
      case 5:
        // 1 week
        interval = 10080 * 60000;
        break;
      default:
        interval = 0;
        break;
    }
  }

  try {
    await prisma.card.update({
      where: {
        id,
      },
      data: { ...updatedCard, nextReview: new Date(reviewDate + interval) },
    });
    revalidatePath('/dashboard/decks/[deckId]', 'page');
  } catch (error) {
    console.log(error);
  }

  if (redirectUrl) {
    redirect(`/dashboard/decks/${card?.deckId}`); // DO NOT PLACE IN TRY/CATCH: nextjs internal bug
  }
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
