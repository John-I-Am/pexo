'use client';

import { Button, Group, Stack, TextInput, Textarea } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { IconEdit, IconSquareRoundedPlus, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import { createCard, deleteCard, updateCard } from '@/app/api/actions/cards';
import { fetchWord } from '@/app/api/actions/dictionary';

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

  const formWord = useForm({
    initialValues: {
      word: '',
    },

    validate: {
      word: hasLength({ min: 1, max: 150 }, 'word must be 1-20 characters long'),
    },
  });

  const handleDefine = async (word: string) => {
    const definition = await fetchWord(word);
    if (definition.error) {
      formWord.setFieldError('word', 'Word not found');
    } else {
      form.setFieldValue('front', word);
      form.setFieldValue('back', definition.definition);
    }
  };

  return (
    <Stack>
      <form onSubmit={formWord.onSubmit((values) => handleDefine(values.word))}>
        <TextInput
          {...formWord.getInputProps('word')}
          label="Autofill: Vocabulary"
          description="Use this to help you create a vocabulary flashcard with definitions"
          placeholder="word"
        />
        <Button
          leftSection={<IconSquareRoundedPlus stroke={1.5} />}
          size="xs"
          variant="light"
          mt="sm"
          type="submit"
        >
          Fill
        </Button>
      </form>

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
          <Group wrap="nowrap" justify="space-between">
            <Button leftSection={<IconEdit stroke={1.5} />} type="submit">
              Edit
            </Button>
            <Button
              leftSection={<IconTrash stroke={1.5} />}
              variant="outline"
              color="red"
              onClick={() => deleteCard(card.id)}
              component={Link}
              href={`/dashboard/decks/${deckId}`}
            >
              Delete
            </Button>
          </Group>
        ) : (
          <Button leftSection={<IconSquareRoundedPlus stroke={1.5} />} type="submit">
            Create
          </Button>
        )}
      </form>
    </Stack>
  );
}
