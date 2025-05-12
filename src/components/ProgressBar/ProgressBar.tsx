'use client';

import { Card } from '@prisma/client';
import { Progress, Stack, Text, useMantineTheme } from '@mantine/core';
import { filterCardsDue } from '@/utils/cards';
import classes from './ProgressBar.module.css';

type ProgressBarProps = {
  cards: Card[];
  showText?: true;
};

export const ProgressBar = ({ cards, showText }: ProgressBarProps) => {
  const cardDue: Card[] = filterCardsDue(cards);
  const theme = useMantineTheme();

  return (
    <Stack w="100%">
      <Progress
        value={((cards.length - cardDue.length) / cards.length) * 100}
        className={classes.wrapper}
        color={theme.other.accentColorLighter}
      />
      {showText && (
        <Text size="sm" c="dimmed" ta="center">
          {`${cards.length - cardDue.length} of ${cards.length} cards completed`}
        </Text>
      )}
    </Stack>
  );
};
