'use client';

import { Stack, Progress, Text } from '@mantine/core';
import { Card } from '@prisma/client';
import { filterCardsDue } from '@/utils/cards';

import classes from './ProgressBar.module.css';

export function ProgressBar({ cards = [] }: { cards: Card[] }) {
  const cardDue: Card[] = filterCardsDue(cards);

  return (
    <Stack>
      <Progress
        value={((cards.length - cardDue.length) / cards.length) * 100}
        className={classes.wrapper}
      />
      <Text size="sm" c="dimmed" ta="center">
        {`${cards.length - cardDue.length} of ${cards.length} cards completed`}
      </Text>
    </Stack>
  );
}
