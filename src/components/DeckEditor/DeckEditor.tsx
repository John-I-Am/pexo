'use client';

import { Group, Text, TextInput, Button, Stack, Loader, Pill, Modal, Paper } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { IconHourglassEmpty, IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import classes from './DeckEditor.module.css';
import { updateDeck } from '@/src/app/api/database/decks/mutations';

export function DeckEditor({
  id,
  title,
  tags = [],
  cardsLength,
}: {
  id: string;
  title: string;
  tags: string[];
  cardsLength: string;
}) {
  const [pending, setPending] = useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure(false);

  const formTitle = useForm({
    initialValues: {
      title,
    },

    //interferences with handleChangeTitle
    // validate: {
    //   title: hasLength({ min: 1, max: 12 }, 'Title must be 1-12 characters long'),
    // },
  });

  const formTag = useForm({
    initialValues: {
      tag: '',
    },

    validate: {
      tag: hasLength({ min: 1, max: 12 }, 'Tag must be 1-12 characters long'),
    },
  });

  // BUG: doesn't work where where is only one letter / validation interference
  const handleChangeTitle = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    formTitle.onSubmit(() => {
      setPending(true);
      updateDeck(id, {
        title: value === '' ? 'untitled' : value,
        tags: undefined,
      }).then(() => {
        setPending(false);
      });
    })();
    formTitle.getInputProps('title').onChange(value);
  };

  const handleSubmitTag = ({ tag }: { tag: string }) => {
    if (!tags.includes(tag)) {
      updateDeck(id, {
        title: undefined,
        tags: [...tags, tag],
      });
    }
    formTag.reset();
    close();
  };

  return (
    <Stack>
      <Modal opened={opened} onClose={close} title="Add tag">
        <form onSubmit={formTag.onSubmit((values: any) => handleSubmitTag(values))}>
          <TextInput {...formTag.getInputProps('tag')} maxLength={12} minLength={1} />
        </form>
      </Modal>

      <Stack align="center" gap={0}>
        <form
          className={classes['form-title']}
          onSubmit={formTitle.onSubmit((values) =>
            updateDeck(id, {
              title: values.title,
              tags: undefined,
            })
          )}
        >
          <TextInput
            {...formTitle.getInputProps('title')}
            classNames={{
              input: classes.title,
              section: classes.loader,
            }}
            onChange={handleChangeTitle}
            variant="unstyled"
            aria-label="Title"
            size="sm"
            maxLength={12}
            minLength={1}
            placeholder="title"
            rightSection={
              pending ? (
                <Group wrap="nowrap">
                  <Loader size={14} />
                  <Text fz="sm" c="dimmed">
                    Saving...
                  </Text>
                </Group>
              ) : (
                <span />
              )
            }
          />
        </form>

        <Text fz="sm">{cardsLength} Total cards</Text>
      </Stack>

      <Group pb="md" className={classes.tags}>
        {tags.map((t) => (
          <Pill
            key={t}
            className={classes.tag}
            withRemoveButton
            onRemove={() =>
              updateDeck(id, {
                title: undefined,
                tags: tags.filter((tag) => tag !== t),
              })
            }
          >
            {t}
          </Pill>
        ))}
      </Group>

      <Group w="100%" justify="space-between" wrap="nowrap">
        <Paper p="sm" radius="md" shadow="sm" className={classes.filler}>
          <Text
            size="xl"
            fw={900}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          >
            You Got This! &#59;&#41;
          </Text>
        </Paper>

        <Group wrap="nowrap">
          <Button radius="md" leftSection={<IconPlus size="1.1rem" />} onClick={open}>
            Add Tag
          </Button>
          <Button
            component={Link}
            href={`/dashboard/decks/${id}/learn`}
            radius="md"
            leftSection={<IconHourglassEmpty size="1.1rem" />}
          >
            Learn
          </Button>

          <Button
            component={Link}
            href={`/dashboard/decks/${id}/card`}
            radius="md"
            leftSection={<IconPlus size="1.1rem" />}
          >
            New Card
          </Button>
        </Group>
      </Group>
    </Stack>
  );
}
