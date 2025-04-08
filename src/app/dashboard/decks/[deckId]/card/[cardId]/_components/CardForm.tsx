'use client';

import { Button, Group, Paper, Stack, TextInput, Textarea } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { IconEdit, IconSquareRoundedPlus, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import { getWord } from '@/src/app/api/database/dictionary/queries';
import { deleteCard, upsertCard } from '@/src/app/api/database/cards/mutations';
import { Card } from '@prisma/client';

type CardFormProps = {
  deckId: string;
  card?: Card;
};

export function CardForm({ deckId, card }: CardFormProps) {
  const formCard: any = useForm({
    mode: 'uncontrolled',
    initialValues: {
      front: card?.front ?? '',
      back: card?.back ?? '',
      audioUrl: card?.audioUrl ?? '',
    },

    validate: {
      front: isNotEmpty('Front of card cannot be empty!'),
      back: isNotEmpty('Back of card cannot be empty!'),
    },
  });

  const formDictionary: any = useForm({
    mode: 'uncontrolled',
    initialValues: {
      word: '',
    },

    validate: {
      word: isNotEmpty(),
    },
  });

  const handleDefine = async (word: string) => {
    const definition = await getWord(word);

    if (definition.error) {
      formDictionary.setFieldError('word', 'Word cannot be found');
    } else {
      formCard.setFieldValue('front', word);
      formCard.setFieldValue('back', definition.definition);
      formCard.setFieldValue('audioUrl', definition.pronunciation);
    }
  };

  return (
    <Stack>
      <Paper>
        <form onSubmit={formDictionary.onSubmit((values: any) => handleDefine(values.word))}>
          <TextInput
            {...formDictionary.getInputProps('word')}
            label="Generate a vocabulary card"
            description="Quickly create a vocabulary flashcard"
            placeholder="word"
            mb="md"
          />

          <Button mt="md" loading={formDictionary.submitting} size="compact-sm" type="submit">
            Generate
          </Button>
        </form>
      </Paper>

      <Paper>
        <form
          onSubmit={formCard.onSubmit((values: any) =>
            upsertCard(deckId, card?.id, values.front, values.back, values.audioUrl)
          )}
        >
          <Textarea
            mb="md"
            label="Front"
            description={`This side should display the question or concept you’re testing`}
            placeholder="what is 2 + 2?"
            autosize
            minRows={4}
            maxRows={8}
            maxLength={1024}
            {...formCard.getInputProps('front')}
          />

          <Textarea
            py="lg"
            label="Back"
            description="This side should display the answer"
            placeholder="4"
            autosize
            minRows={4}
            maxRows={8}
            maxLength={1024}
            {...formCard.getInputProps('back')}
          />

          {card ? (
            <Group wrap="nowrap" justify="space-between">
              <Button
                mt="md"
                loading={formCard.submitting}
                leftSection={<IconEdit stroke={1.5} />}
                type="submit"
              >
                Edit
              </Button>
              <Button
                mt="md"
                loading={formCard.submitting}
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
            <Button
              mt="md"
              loading={formCard.submitting}
              leftSection={<IconSquareRoundedPlus stroke={1.5} />}
              type="submit"
            >
              Create
            </Button>
          )}
        </form>
      </Paper>
    </Stack>
  );
}
