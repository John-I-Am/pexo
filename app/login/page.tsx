'use client';

import {
  TextInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';

import { useForm, isEmail } from '@mantine/form';
import classes from './AuthenticationTitle.module.css';
import { authenticate } from '@/app/api/actions/users';

export default function AuthenticationTitle() {
  const form = useForm({
    initialValues: {
      email: '',
    },

    validate: {
      email: isEmail('Invalid email'),
    },
  });

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        In early beta.
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit((values) => authenticate(undefined, values))}>
          <TextInput label="Email" placeholder="you@example.com" {...form.getInputProps('email')} />
          <Text c="dimmed" size="sm" ta="center" mt={10}>
            You'll receive a login link via email.
          </Text>
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor size="sm">Problem signing in?</Anchor>
          </Group>
          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
