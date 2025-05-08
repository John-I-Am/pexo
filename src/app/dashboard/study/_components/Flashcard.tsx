'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { Deck } from '@prisma/client';
import { IconChevronLeft, IconMoodSmileBeam } from '@tabler/icons-react';
import { Box, Button, Container, Stack, Text, ThemeIcon } from '@mantine/core';
import { ActiveDeckContext } from '@/app/contexts/ActiveDeckProvider';
import { FlashCard as FlashCardCard } from '@/components/FlashCard/FlashCard';
import FlashCardToolbar from '@/components/FlashCardToolbar/FlashCardToolbar';
import { ProgressBar } from '@/components/ProgressBar/ProgressBar';
import { filterCardsDue } from '@/utils/cards';
import classes from './Flashcard.module.css';

function EmptyDeck() {
  return (
    <Stack mb="30%">
      <Container>
        <ThemeIcon variant="outline" radius="lg" size="xxl">
          <IconMoodSmileBeam size={150} />
        </ThemeIcon>
      </Container>
      <Text
        ta="center"
        size="xl"
        fw={900}
        variant="gradient"
        gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
      >
        Well done! you've reviewed all cards for this session.
      </Text>
      <Button
        component={Link}
        href="/dashboard"
        leftSection={<IconChevronLeft size={20} />}
        variant="gradient"
        gradient={{ from: 'yellow', to: 'cyan', deg: 90 }}
      >
        Go Back
      </Button>
    </Stack>
  );
}

type FlashCardProps = {
  decks: Deck[];
};

export const FlashCard = ({ decks }: FlashCardProps) => {
  const { activeDeckId }: any = useContext(ActiveDeckContext);
  let activeDeck: any = [];

  if (activeDeckId === null) {
    activeDeck = decks.flatMap((deck: Deck) => deck.cards);
  } else {
    activeDeck = decks.find((deck: Deck) => deck.id === activeDeckId);
  }

  const cardsToStudy = filterCardsDue(activeDeck);

  return (
    <Stack align="center">
      <Box w="80%">
        <ProgressBar cards={cardsToStudy} />
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
