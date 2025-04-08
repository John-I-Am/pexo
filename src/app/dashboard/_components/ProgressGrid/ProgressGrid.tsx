'use client';

import { Paper, Title, Stack, Group, Button } from '@mantine/core';
import { ProgressBar } from '../../../../components/ProgressBar/ProgressBar';
import classes from './ProgressGrid.module.css';
import { Card } from '@prisma/client';
import { IconCircleChevronRight } from '@tabler/icons-react';
import Link from 'next/link';

export function ProgressGrid({ cards }: { cards: Card[] }) {
  return (
    <Paper>
      <Group justify="space-between" wrap="nowrap" pb="sm">
        <Title order={2}>My Progress</Title>
        <Button
          className={classes.button}
          color="black"
          variant="filled"
          component={Link}
          href={`/dashboard/decks`}
          rightSection={<IconCircleChevronRight />}
        >
          Start Learning
        </Button>
      </Group>

      <Paper className={classes.decks}>
        <Stack>
          <Title order={3}>Active word progress</Title>
          <ProgressBar cards={cards} />
        </Stack>
      </Paper>
    </Paper>
  );
}
