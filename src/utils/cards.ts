import dayjs from '@/lib/dayjs';
import { Card } from '@/generated/prisma';

export const filterCardsReviewedOnDate = (cards: Card[], date: Date): Card[] => {
  const targetDate = dayjs(date).startOf('day'); // Normalize input date (start of the day)

  const cardsReviewed: Card[] = cards.filter((card: Card) => {
    return card.reviewedDates.some((reviewedDate: Date) => {
      return dayjs(reviewedDate).isSame(targetDate, 'day');
    });
  });

  return cardsReviewed;
};

export const filterCardsDue = (cards: Card[]): Card[] => {
  const cardsDue: Card[] = cards.filter((card: Card) =>
    dayjs(card.nextReview).isSameOrBefore(dayjs().toDate())
  );

  return cardsDue;
};
