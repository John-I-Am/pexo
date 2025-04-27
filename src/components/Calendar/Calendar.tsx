'use client';

import { Calendar as CalendarComponent, DatePickerProps } from '@mantine/dates';
import { Stack, Text } from '@mantine/core';
import classes from './Calendar.module.css';
import dayjs from '@/lib/dayjs';
import cx from 'clsx';
import { Card } from '@prisma/client';
import { cardsReviewedOnDate } from '@/utils/cards';
import { OpUnitType } from 'dayjs';

type CalendarProps = { cards: Card[]; month?: Date; startOfWeek?: Date };

export const Calendar = ({ cards, month, startOfWeek }: CalendarProps) => {
  const dayRenderer: DatePickerProps['renderDay'] = (date: Date) => {
    const cardsReviewedToday: Card[] = cardsReviewedOnDate(cards, date);

    return (
      <Stack align="center" className={classes['day-wrapper']}>
        <div
          className={cx(classes.day, {
            [classes['reviewed']]: cardsReviewedToday.length !== 0,
          })}
        >
          <span></span>
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
      monthLabelFormat={'MMMM'}
      renderDay={dayRenderer}
      getDayProps={
        startOfWeek &&
        ((date: Date) => {
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
