'use client';

import { Stack, Title, Tabs, Group, Text, List, ThemeIcon, Button } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

import classes from './Pricing.module.css';
import { loginPath } from '@/lib/paths';
import Link from 'next/link';

const data = [
  {
    title: 'Basic',
    price: 'Free',
    items: [
      {
        name: 'Unlimited Cards',
        checked: true,
      },
      {
        name: 'Unlimited Decks',
        checked: true,
      },
      {
        name: 'High priority support',
        checked: false,
      },
      {
        name: 'Advanced card builder tools',
        checked: false,
      },
      {
        name: 'Unlimited access to prebuilt decks',
        checked: false,
      },
    ],
    buttonLabel: 'Start free plan',
    link: loginPath(),
  },
  {
    title: 'Premium',
    price: '$4.99 NZD /month',
    items: [
      {
        name: 'Unlimited Cards',
        checked: true,
      },
      {
        name: 'Unlimited Decks',
        checked: true,
      },
      {
        name: 'High priority support',
        checked: true,
      },
      {
        name: 'Advanced card builder tools',
        checked: true,
      },
      {
        name: 'Unlimited access to prebuilt decks',
        checked: true,
      },
    ],
    buttonLabel: 'Join premium plan',
    link: loginPath(),
  },
];

export function Pricing() {
  const plans = data.map((plan) => (
    <Stack key={plan.title} className={classes.container}>
      <Title order={2} c="dimmed" tt="uppercase">
        {plan.title}
      </Title>
      <Text size="xl" c="white">
        {plan.price}
      </Text>
      <List classNames={classes} spacing="md" size="sm" center>
        {plan.items.map((item) => (
          <List.Item
            key={plan.title + item.name}
            icon={
              <ThemeIcon color={item.checked ? 'teal' : 'grey'} size={24} radius="xl">
                <IconCheck size={16} />
              </ThemeIcon>
            }
          >
            {item.name}
          </List.Item>
        ))}
      </List>
      <Button bg="orange.9" component={Link} href={plan.link}>
        {plan.buttonLabel}
      </Button>
    </Stack>
  ));

  return (
    <Stack>
      <Title size="xl" fw="600" order={2} ta="center">
        Simple Pricing
      </Title>
      <Text size="sm" ta="center" px="xl" py="md">
        Start with our free plan and upgrade when you need more. No hidden fees.
      </Text>
      <Group justify="center">{plans}</Group>
    </Stack>
  );
}
