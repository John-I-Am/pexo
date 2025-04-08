import { Card } from '@prisma/client';

export const useCardsDue = (cards: Card[]): Card[] => {
  const cardsDue: Card[] = cards.filter(
    (card: Card) => new Date(card.nextReview).getTime() <= new Date().getTime()
  );

  return cardsDue;
};

// Returns an array containing all the dates on which a card has been reviewed
export const useDaysReviewed = (cards: Card[]): Date[] => {
  const set = new Set<string>();

  cards.forEach((card: Card) => {
    card.reviewedDates.forEach((date: Date) => {
      // Convert date to a string in 'YYYY-MM-DD' format to ensure uniqueness by day
      const dateString: string = new Date(date).toISOString().split('T')[0];
      set.add(dateString);
    });
  });

  // Convert the set of date strings back to Date objects
  return Array.from(set).map((dateString) => new Date(dateString));
};
