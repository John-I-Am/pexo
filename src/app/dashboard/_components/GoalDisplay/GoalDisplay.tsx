'use client';

import { Button, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { Card, SessionLog } from '@prisma/client';
import { modals } from '@mantine/modals';
import { Calendar } from '@/components/Calendar/Calendar';
import dayjs from '@/lib/dayjs';
import { filterCardsReviewedOnDate } from '@/utils/cards';

type GoalDisplayProps = {
  cards: Card[];
  sessionLog: SessionLog;
};

export const GoalDisplay = ({ cards, sessionLog }: GoalDisplayProps) => {
  const cardsReviewedToday: Card[] = filterCardsReviewedOnDate(cards, dayjs().toDate());

  return (
    <Paper>
      <Stack>
        <Group justify="space-between" wrap="nowrap">
          <Title order={2}>Today's goals</Title>
          <Button
            variant="subtle"
            onClick={() =>
              modals.openContextModal({
                modal: 'goalSliderModal',
                innerProps: { initialGoal: 50, userId: sessionLog.userId },
              })
            }
          >
            Change goal
          </Button>
        </Group>

        <Text mt="-10px" fz="sm" c="dimmed">
          {`${cardsReviewedToday.length} / ${sessionLog.goal} cards`}
        </Text>
      </Stack>
      <Calendar cards={cards} startOfWeek={dayjs().startOf('isoWeek').toDate()} />
    </Paper>
  );
};
