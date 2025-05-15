'use client';

import { useContext } from 'react';
import { Group, Paper, Stack, Title } from '@mantine/core';
import { ActiveDeckContext } from '@/app/contexts/ActiveDeckProvider';
import { DeckWithCards } from '@/lib/prisma/types';
import { ProgressBar } from '../../../../components/ProgressBar/ProgressBar';
import classes from './ProgressDisplay.module.css';

export const ProgressDisplay = ({ decks }: { decks: DeckWithCards[] }) => {
  const { activeDeckIds }: any = useContext(ActiveDeckContext);
  const activeDecks = decks.filter((deck) => activeDeckIds.includes(deck.id));
  const activeDeckCards = activeDecks.flatMap((deck) => deck.cards);

  return (
    <Paper>
      <Group justify="space-between" wrap="nowrap" pb="sm">
        <Title order={2}>My Progress</Title>
      </Group>

      <Paper className={classes.progress}>
        <Stack>
          <Title order={3}>Active word progress</Title>
          <ProgressBar cards={activeDeckCards ?? []} showText />
        </Stack>
      </Paper>
    </Paper>
  );
};
