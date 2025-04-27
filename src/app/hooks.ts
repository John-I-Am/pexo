import { Card } from '@prisma/client';
import dayjs from '@/lib/dayjs';

export const useCardsDue = (cards: Card[]): Card[] => {
  const cardsDue: Card[] = cards.filter(
    (card: Card) => new Date(card.nextReview).getTime() <= new Date().getTime()
  );

  return cardsDue;
};

// Returns an array containing all the dates on which a card has been reviewed
export const useDaysReviewed = (cards: Card[]): string[] => {
  const set = new Set<string>();

  cards.forEach((card: Card) => {
    card.reviewedDates.forEach((date: Date) => {
      if (dayjs(date).isToday()) set.add(dayjs().format('YYYY-MM-DD'));
    });
  });

  return Array.from(set);
};

export const useCardsReviewedToday = (cards: Card[]): Card[] => {
  const cardsReviewedToday = cards.filter((card: Card) => {
    const lastReviewedDate = card.reviewedDates[card.reviewedDates.length - 1];
    return dayjs(lastReviewedDate).isToday();
  });

  return cardsReviewedToday;
};
