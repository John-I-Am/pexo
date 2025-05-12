/* eslint-disable no-console */
'use client';

import { Paper, TextInput, Title } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import classes from './FormName.module.css';

export function FormName() {
  const form = useForm({
    initialValues: {
      name: 'nickname',
    },

    validate: {
      name: hasLength({ min: 1, max: 20 }, 'Name must be 1-20 characters long'),
    },
  });

  return (
    <Paper shadow="xs" radius="md" p="md">
      <Title order={3}>Name</Title>
      <form onSubmit={form.onSubmit((value) => console.log(value))}>
        <TextInput
          {...form.getInputProps('name')}
          leftSectionPointerEvents="none"
          label="Name"
          placeholder="Your name"
          description="What shall we call you?"
          classNames={{ root: classes.wrapper }}
        />
        {/* <Button leftSection={<IconEdit size="1.1rem" />} variant="filled" radius="md">
          Save
        </Button> */}
      </form>
    </Paper>
  );
}
