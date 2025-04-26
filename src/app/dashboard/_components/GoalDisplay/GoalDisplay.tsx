'use client';

import { Button, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { DatePicker, DatePickerProps } from '@mantine/dates';
import dayjs from '@/src/lib/dayjs';

import classes from './GoalDisplay.module.css';
import cx from 'clsx';
import { Card, Deck } from '@prisma/client';
import { DeckWithCards } from '@/src/lib/prisma/types';
import { GoalSlider } from '@/src/components/GoalSlider/GoalSlider';
import { useDaysReviewed } from '@/src/app/hooks';

export const GoalDisplay = ({ cards }: { cards: Card[] }) => {
  const today = dayjs();
  const startOfWeek = today.startOf('isoWeek');
  const endOfWeek = today.endOf('isoWeek');

  const daysReviewed: string[] = useDaysReviewed(cards);

  const dayRenderer: DatePickerProps['renderDay'] = (date) => {
    return (
      <Stack align="center">
        <div
          className={cx(classes.day, {
            [classes['reviewed']]: daysReviewed.includes(dayjs(date).format('YYYY-MM-DD')),
          })}
        >
          <span></span>
        </div>
        <Text
          fz="xs"
          px="6px"
          py="2px"
          className={cx({
            [classes['current-day']]: dayjs(date).isSame(dayjs(), 'day'),
          })}
        >
          {dayjs(date).format('ddd')}
        </Text>
      </Stack>
    );
  };

  return (
    <Paper>
      <Stack>
        <Group justify="space-between" wrap="nowrap">
          <Title order={2}>Today's goals</Title>
          <Button variant="subtle">Change goal</Button>
        </Group>

        <Text mt="-10px" fz="sm" c="dimmed">
          {`0 / 50`}
        </Text>
      </Stack>
      <DatePicker
        classNames={{ calendarHeader: classes.header, month: classes.month }}
        hideWeekdays
        renderDay={dayRenderer}
        getDayProps={(date) => {
          const isCurrentWeek =
            dayjs(date).isSameOrAfter(startOfWeek, 'isoWeek' as any) &&
            dayjs(date).isSameOrBefore(endOfWeek, 'isoWeek' as any);

          return {
            hidden: !isCurrentWeek,
          };
        }}
      />
    </Paper>
  );
};
