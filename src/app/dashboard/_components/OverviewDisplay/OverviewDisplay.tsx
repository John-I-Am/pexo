'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { Deck } from '@prisma/client';
import {
  IconChevronRight,
  IconSquareNumber0Filled,
  IconSquareNumber1Filled,
  IconSquareNumber2Filled,
  IconSquareNumber3Filled,
  IconSquareNumber4Filled,
  IconSquareNumber5Filled,
  IconSquareNumber6Filled,
  IconSquareNumber7Filled,
  IconSquareNumber8Filled,
  IconSquareNumber9Filled,
} from '@tabler/icons-react';
import { Button, Group, Paper, Text, Title } from '@mantine/core';
import { ActiveDeckContext } from '@/app/contexts/ActiveDeckProvider';
import { studyPath } from '@/lib/paths';
import classes from './OverviewDisplay.module.css';

const digitIcons: any = {
  0: IconSquareNumber0Filled,
  1: IconSquareNumber1Filled,
  2: IconSquareNumber2Filled,
  3: IconSquareNumber3Filled,
  4: IconSquareNumber4Filled,
  5: IconSquareNumber5Filled,
  6: IconSquareNumber6Filled,
  7: IconSquareNumber7Filled,
  8: IconSquareNumber8Filled,
  9: IconSquareNumber9Filled,
};

type OverviewDisplayProps = {
  decks: Deck[];
  goal: number;
};

export const OverviewDisplay = ({ decks, goal }: OverviewDisplayProps) => {
  const { activeDeckIds }: any = useContext(ActiveDeckContext);
  const digits: string[] = goal.toString().split('');

  return (
    <Paper>
      <Group justify="space-between" wrap="nowrap">
        <Title order={2}>
          Active decks <span className={classes.actives}>{activeDeckIds.length}</span>
        </Title>

        <Button
          component={Link}
          href={studyPath()}
          justify="space-between"
          leftSection={<span />}
          rightSection={<IconChevronRight />}
        >
          Start Learning
        </Button>
      </Group>
      <Group mt="lg">
        <Group mr="md" gap={0}>
          {digits.map((digit: string, index: number) => {
            const IconComponent: any = digitIcons[+digit as number];
            return <IconComponent key={index + digit} />;
          })}
        </Group>
        <div>
          <Text fw={500}>Today's goal</Text>
          <Text size="sm" pt="xs">
            Complete 50 cards
          </Text>
          <Text size="sm">
            You have done 0 cards today. Complete 10 cards in order to achieve your goal.
          </Text>
        </div>
      </Group>
    </Paper>
  );
};
