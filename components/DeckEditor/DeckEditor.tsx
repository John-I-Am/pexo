'use client';

import { Group, Text, TextInput, Button } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { IconSquareRoundedPlus } from '@tabler/icons-react';
import Link from 'next/link';
import classes from './DeckEditor.module.css';
import { updateDeck } from '@/app/api/actions/decks';

export function DeckEditor({
  id,
  title,
  cardsLength,
}: {
  id: string;
  title: string;
  cardsLength: string;
}) {
  const form = useForm({
    initialValues: {
      title,
    },

    validate: {
      title: hasLength({ min: 1, max: 12 }, 'Title must be 1-12 characters long'),
    },
  });

  const handleChange = (e: any) => {
    form.getInputProps('title').onChange(e);
    // Pretty sure this is not the correct way to call server actions on input change.
    // Currently, it ignores the last character; doesn't save to server.
    form.onSubmit((values) => updateDeck(id, values.title))();
  };

  return (
    <Group wrap="nowrap" justify="space-around" w="100%">
      <Button
        component={Link}
        href={`/dashboard/decks/${id}/card`}
        leftSection={<IconSquareRoundedPlus size={20} />}
        variant="gradient"
        gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
      >
        New Card
      </Button>
      <form onSubmit={form.onSubmit((values) => updateDeck(id, values.title))}>
        <TextInput
          {...form.getInputProps('title')}
          classNames={{
            input: classes.title,
          }}
          onChange={handleChange}
          variant="unstyled"
          aria-label="Title"
          size="md"
          radius="md"
          maxLength={12}
          placeholder="title"
        />
      </form>

      <Text c="dimmed">{cardsLength} cards</Text>
      <Button
        component={Link}
        href={`/dashboard/decks/${id}/learn`}
        leftSection={<IconSquareRoundedPlus size={20} />}
        variant="gradient"
        gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
      >
        Learn
      </Button>
    </Group>
  );
}
