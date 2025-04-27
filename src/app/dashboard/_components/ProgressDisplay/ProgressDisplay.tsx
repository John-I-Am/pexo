'use client';

import { Paper, Title, Stack, Group } from '@mantine/core';
import { ProgressBar } from '../../../../components/ProgressBar/ProgressBar';
import classes from './ProgressDisplay.module.css';

import { useContext } from 'react';
import { ActiveDeckContext } from '@/app/contexts/ActiveDeckProvider';
import { DeckWithCards } from '@/lib/prisma/types';

export const ProgressDisplay = ({ decks }: { decks: DeckWithCards[] }) => {
  const { activeDeckId, setActiveDeck }: any = useContext(ActiveDeckContext);
  const activeDeckCards =
    activeDeckId === null
      ? decks.flatMap((deck) => deck.cards)
      : decks.find((deck) => deck.id === activeDeckId)?.cards;

  return (
    <Paper>
      <Group justify="space-between" wrap="nowrap" pb="sm">
        <Title order={2}>My Progress</Title>
      </Group>

      <Paper className={classes.progress}>
        <Stack>
          <Title order={3}>Active word progress</Title>
          <ProgressBar cards={activeDeckCards} />
        </Stack>
      </Paper>
    </Paper>
  );
};
