'use client';

import { useContext } from 'react';
import { Box, Stack } from '@mantine/core';
import { ActiveDeckContext } from '@/app/contexts/ActiveDeckProvider';
import { FlashCard as FlashCardCard } from '@/components/FlashCard/FlashCard';
import { FlashCardToolbar } from '@/components/FlashCardToolbar/FlashCardToolbar';
import { ProgressBar } from '@/components/ProgressBar/ProgressBar';
import { DeckWithCards } from '@/lib/prisma/types';
import { filterCardsDue } from '@/utils/cards';
import { EmptyDeck } from './EmptyDeck/EmptyDeck';
import classes from './Flashcard.module.css';

type FlashCardProps = {
  decks: DeckWithCards[];
};

export const FlashCard = ({ decks }: FlashCardProps) => {
  const { activeDeckIds }: any = useContext(ActiveDeckContext);
  const activeDecks = decks.filter((deck) => activeDeckIds.includes(deck.id));
  const cardsToStudy = filterCardsDue(activeDecks.flatMap((deck: DeckWithCards) => deck.cards));

  return (
    <Stack align="center">
      <Box w="80%">
        <ProgressBar cards={cardsToStudy} showText />
      </Box>
      {cardsToStudy.length === 0 ? (
        <EmptyDeck />
      ) : (
        <Stack justify="space-around" h="100%" px="lg" className={classes.container}>
          <FlashCardCard
            id={cardsToStudy[0].id}
            front={cardsToStudy[0].front}
            back={cardsToStudy[0].back}
            level={cardsToStudy[0].level.toString()}
            reviewCount={cardsToStudy[0].reviewedDates.length}
          />
          <FlashCardToolbar
            cardId={cardsToStudy[0].id}
            currentLevel={cardsToStudy[0].level}
            audioUrl={cardsToStudy[0].audioUrl}
          />
        </Stack>
      )}
    </Stack>
  );
};
