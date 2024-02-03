'use client';

import { Group, Text, TextInput, Button } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { IconSquareRoundedPlus } from '@tabler/icons-react';
import { CardEditor } from '../CardEditor/CardEditor';
import { updateDeck } from '@/app/api/actions/decks';
import { createCard } from '@/app/api/actions/cards';

export function DeckEditor({ id, title, cardsLength }: any) {
  const form = useForm({
    initialValues: {
      title,
      description: 'this my deck yo',
    },

    validate: {
      title: hasLength({ min: 1, max: 12 }, 'Title must be 1-12 characters long'),
    },
  });
  return (
    <Group wrap="nowrap">
      <Button
        onClick={() => createCard(id)}
        leftSection={<IconSquareRoundedPlus size={20} />}
        variant="gradient"
        gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
      >
        Create New Card
      </Button>
      <form onSubmit={form.onSubmit((values) => updateDeck(id, values.title))}>
        <TextInput
          aria-label="Title"
          size="md"
          radius="md"
          maxLength={12}
          placeholder="title"
          {...form.getInputProps('title')}
        />
      </form>

      <Text>{cardsLength}</Text>
    </Group>
  );
}
