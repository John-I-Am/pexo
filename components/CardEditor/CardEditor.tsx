'use client';

import { Button, Stack, Textarea } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { IconEdit, IconSquareRoundedPlus } from '@tabler/icons-react';
import { createCard, updateCard } from '@/app/api/actions/cards';

export function CardEditor({ deckId, card }: any) {
  const form = useForm({
    initialValues: {
      front: card?.front || '',
      back: card?.back || '',
    },

    validate: {
      front: hasLength({ min: 1, max: 150 }, 'Front content must be 1-150 characters long'),
      back: hasLength({ min: 1, max: 150 }, 'Back content must be 1-150 characters long'),
    },
  });

  return (
    <Stack>
      <form
        onSubmit={form.onSubmit((values) =>
          card ? updateCard(card.id, values, true) : createCard(deckId, values.front, values.back)
        )}
      >
        <Textarea
          pb="md"
          radius="md"
          label="Front"
          description="Front side of card"
          placeholder="What color is an apple?"
          autosize
          minRows={2}
          maxRows={4}
          {...form.getInputProps('front')}
        />

        <Textarea
          pb="md"
          radius="md"
          label="Back"
          description="Back side of card"
          placeholder="Red"
          autosize
          minRows={2}
          maxRows={4}
          {...form.getInputProps('back')}
        />

        {card ? (
          <Button leftSection={<IconEdit stroke={1.5} />} type="submit">
            Edit
          </Button>
        ) : (
          <Button leftSection={<IconSquareRoundedPlus stroke={1.5} />} type="submit">
            Create
          </Button>
        )}
      </form>
    </Stack>
  );
}
