'use client';

import Link from 'next/link';
import { Card } from '@prisma/client';
import { IconEye, IconPhoto, IconPlus } from '@tabler/icons-react';
import { Badge, Box, Button, Group, Paper, Stack, Text, useMantineTheme } from '@mantine/core';
import { ProgressBar } from '@/components/ProgressBar/ProgressBar';
import classes from './Deck.module.css';

type DeckProps = {
  id: string;
  title: string;
  description: string;
  cards: Card[];
  tags: string[];
  isPrebuilt?: true;
};

export const Deck = ({ id, title, description, cards, tags, isPrebuilt }: DeckProps) => {
  const theme = useMantineTheme();

  return (
    <Paper>
      <Stack gap="lg">
        <Group>
          <IconPhoto size="32" />
          <Group className={classes.tags}>
            {tags.map((tag: string) => (
              <Badge key={tag} color={theme.other.accentColorLightest} className={classes.tag}>
                {tag}
              </Badge>
            ))}
          </Group>
        </Group>
        <div>
          <Text size="lg" fw={500}>
            {title}
          </Text>
          <Text size="sm">{description}</Text>
        </div>
        <Group justify="space-between">
          <Button
            component={isPrebuilt ? undefined : Link}
            href={`/dashboard/decks/${id}`}
            size="xs"
            leftSection={<IconEye size="1.1rem" />}
          >
            View
          </Button>

          {isPrebuilt && (
            <Button size="xs" leftSection={<IconPlus size="1.1rem" />}>
              Add
            </Button>
          )}

          {!isPrebuilt && (
            <Box w="40%" data-testid="progress-bar">
              <ProgressBar cards={cards} />
            </Box>
          )}
        </Group>
      </Stack>
    </Paper>
  );
};
