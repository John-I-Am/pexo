'use client';

import { IconArrowLeft } from '@tabler/icons-react';
import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Group,
  Paper,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import classes from './LoginForm.module.css';
import { isEmail, useForm } from '@mantine/form';
import { authenticate } from '@/src/app/api/auth/authenticate';
import { homePath } from '@/src/lib/paths';

export function LoginForm() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
    },

    validate: {
      email: isEmail('Please enter a valid email'),
    },
  });

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} ta="center">
        Come On In!
      </Title>

      <Text c="dimmed" fz="sm" ta="center">
        {`⚠️ Pardon the mess — We're still under construction =)`}
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <form onSubmit={form.onSubmit((values) => authenticate(undefined, values))}>
          <TextInput
            mb="xl"
            label="Your email"
            placeholder="example@email.com"
            required
            {...form.getInputProps('email')}
          />
          <Group justify="space-between" mt="lg" className={classes.controls}>
            <Anchor href={homePath()} c="dimmed" size="sm" className={classes.control}>
              <Center inline>
                <IconArrowLeft size={12} stroke={1.5} />
                <Box ml={5}>Back to the home page</Box>
              </Center>
            </Anchor>
            <Button loading={form.submitting} type="submit" className={classes.control}>
              Enter
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
