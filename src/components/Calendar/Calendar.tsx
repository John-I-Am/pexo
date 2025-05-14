'use client';

import dayjs from '@/lib/dayjs';
import { OpUnitType } from 'dayjs';
import { Card } from '@prisma/client';
import cx from 'clsx';
import { Stack, Text } from '@mantine/core';
import { Calendar as CalendarComponent, DatePickerProps } from '@mantine/dates';
import { filterCardsReviewedOnDate } from '@/utils/cards';
import classes from './Calendar.module.css';

type CalendarProps = { cards: Card[]; month?: Date; startOfWeek?: Date };

export const Calendar = ({ cards, month, startOfWeek }: CalendarProps) => {
  const dayRenderer: DatePickerProps['renderDay'] = (date: string) => {
    const cardsReviewedToday: Card[] = filterCardsReviewedOnDate(cards, dayjs(date).toDate());

    return (
      <Stack align="center" className={classes['day-wrapper']}>
        <div
          className={cx(classes.day, {
            [classes.reviewed]: cardsReviewedToday.length !== 0,
          })}
        >
          <span />
        </div>
        <Text
          fz="xs"
          px="6px"
          py="2px"
          className={cx({
            [classes['day-current']]: dayjs(date).isSame(dayjs(), 'day'),
          })}
        >
          {dayjs(date).format('ddd')}
        </Text>
      </Stack>
    );
  };

  return (
    <CalendarComponent
      classNames={{
        calendarHeader: startOfWeek ? classes['header-control'] : classes.header,
        calendarHeaderControl: classes['header-control'],
        month: classes.month,
      }}
      defaultDate={month}
      hideOutsideDates
      hideWeekdays
      monthLabelFormat="MMMM"
      renderDay={dayRenderer}
      getDayProps={
        startOfWeek &&
        ((date: string) => {
          const isCurrentWeek =
            dayjs(date).isSameOrAfter(startOfWeek, 'isoWeek' as OpUnitType) &&
            dayjs(date).isSameOrBefore(
              dayjs(startOfWeek).endOf('isoWeek'),
              'isoWeek' as OpUnitType
            );

          return {
            hidden: !isCurrentWeek,
          };
        })
      }
    />
  );
};
