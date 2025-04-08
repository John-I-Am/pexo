/* eslint-disable react/no-unescaped-entities */

'use client';

import { Box, Button, Group, Paper, Stack, Text, Title } from '@mantine/core';
import cx from 'clsx';
import { modals } from '@mantine/modals';
import classes from './GoalsGrid.module.css';
import { useDaysReviewed } from '@/src/app/hooks';
import { GoalSlider } from '../../../../components/GoalSlider/GoalSlider';

function Week({
  startOfWeek,
  cards,
  sessionLogs,
}: {
  startOfWeek: Date;
  cards: any;
  sessionLogs: any;
}) {
  const dates = useDaysReviewed(cards);
  return (
    <Group gap={0} className={classes.week} justify="space-evenly" wrap="nowrap">
      {[0, 1, 2, 3, 4, 5, 6].map((offset) => {
        const currentDate = new Date().getDay(); // this tracks the current date
        const dayDate: any = new Date(startOfWeek);
        dayDate.setDate(dayDate.getDate() + offset); // This tracks the specific date of each day div

        const isDateInDates = dates.some((date) => date.toDateString() === dayDate.toDateString()); // checks if specified date is in dates array and therefore has been reviewed

        const cardsReviewedToday = cards.filter((card: any) =>
          card.reviewedDates.some((reviewedDate: Date) => {
            const reviewedDay = new Date(reviewedDate);
            const nowDate = new Date();
            reviewedDay.setHours(0, 0, 0, 0);
            nowDate.setHours(0, 0, 0, 0);
            return reviewedDay.getTime() === nowDate.getTime();
          })
        );

        const normalizedDayDate = new Date(dayDate);
        normalizedDayDate.setHours(0, 0, 0, 0);

        const day = sessionLogs.find((session: any) => {
          const sessionDate = new Date(session.day);
          sessionDate.setHours(0, 0, 0, 0);
          return sessionDate.getTime() === normalizedDayDate.getTime();
        });

        const goalReached = isDateInDates ? day?.goal <= cardsReviewedToday.length : false;

        return (
          <Stack
            px="sm"
            justify="center"
            align="center"
            key={offset}
            className={offset < currentDate ? classes.hovered : ''}
            onClick={
              offset <= currentDate
                ? () => {
                    modals.open({
                      children: (
                        <>
                          <Text>{dayDate.toLocaleDateString('en-US')}</Text>
                          <Text>{goalReached ? 'YUP' : 'Nope'}</Text>
                        </>
                      ),
                    });
                  }
                : undefined
            }
          >
            <div
              className={cx(classes.day, {
                [classes.reviewed]: isDateInDates,
                [classes['goal-reached']]: goalReached,
              })}
            >
              <span />
            </div>
            <Text
              px="2px"
              fz="xs"
              className={cx(classes['day-label'], {
                [classes['day-label-current']]: offset === currentDate - 1,
              })}
            >
              {dayDate.toLocaleDateString('en-US', { weekday: 'short' })}
            </Text>
          </Stack>
        );
      })}
    </Group>
  );
}

export function GoalsGrid({ cards, goal, sessionLogs, sessionLog }: any) {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const diff = currentDay === 0 ? -6 : 1 - currentDay; // If today is Sunday (0), go back 6 days, otherwise go back to Monday.
  const lastMonday = new Date(currentDate.setDate(currentDate.getDate() + diff));

  const lastLastMonday = new Date(currentDate);
  lastLastMonday.setDate(currentDate.getDate() + diff * 2);

  const cardsReviewedToday = cards.filter((card: any) =>
    card.reviewedDates.some((reviewedDate: Date) => {
      const reviewedDay = new Date(reviewedDate);
      const nowDate = new Date();
      reviewedDay.setHours(0, 0, 0, 0);
      nowDate.setHours(0, 0, 0, 0);
      return reviewedDay.getTime() === nowDate.getTime();
    })
  );

  return (
    <Paper>
      <Stack>
        <Group justify="space-between" wrap="nowrap">
          <Title order={2}>Today's goals</Title>
          <Button
            variant="subtle"
            onClick={() => {
              modals.open({
                children: <GoalSlider initialGoal={goal} sessionLogId={sessionLog.id} />,
              });
            }}
          >
            Change goal
          </Button>
        </Group>

        <Text mt="-10px" fz="sm" c="dimmed">
          {`${cardsReviewedToday.length} / ${goal}`}
        </Text>
        <Group wrap="nowrap" justify="space-between">
          <Box w="100%" className={classes.weeks}>
            <Week cards={cards} startOfWeek={lastLastMonday} sessionLogs={sessionLogs} />
          </Box>

          <Week cards={cards} startOfWeek={lastMonday} sessionLogs={sessionLogs} />
        </Group>
      </Stack>
    </Paper>
  );
}
