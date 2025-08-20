'use client';

import Link from 'next/link';
import { IconCheck, IconCrown } from '@tabler/icons-react';
import { Button, Group, List, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { loginPath } from '@/lib/paths';
import classes from './Pricing.module.css';

const data = [
  {
    title: 'Basic',
    price: 'Free',
    items: [
      {
        name: 'Unlimited cards',
        checked: true,
      },
      {
        name: 'Limited decks',
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
    price: '$4.99',
    items: [
      {
        name: 'Unlimited cards',
        checked: true,
      },
      {
        name: 'Unlimited decks',
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

export const Pricing = () => {
  const plans = data.map((plan) => (
    <Stack key={plan.title} className={classes.container}>
      <Title order={2} tt="uppercase" c="black" fw="bold">
        {plan.title}
      </Title>
      <Text size="xl" c="white" className={classes.price}>
        {plan.price} {plan.price !== 'Free' && <span className={classes.monthly}>NZD /month</span>}
      </Text>
      <List spacing="md" size="sm" py="md" center>
        {plan.items.map((item) => (
          <List.Item
            key={plan.title + item.name}
            icon={
              <ThemeIcon color={item.checked ? 'teal' : 'grey'} size={24} radius="xl">
                <IconCheck size={16} />
              </ThemeIcon>
            }
          >
            <Text fw="500">{item.name}</Text>
          </List.Item>
        ))}
      </List>
      <Button
        color={plan.title === 'Premium' ? 'red.6' : undefined}
        size="md"
        component={Link}
        href={plan.link}
      >
        {plan.buttonLabel}
      </Button>
    </Stack>
  ));

  return (
    <Stack id="pricing">
      <Title size="3rem" fw="600" order={2} ta="center">
        Simple Pricing
        <IconCrown />
      </Title>
      <Text ta="center" px="xl" py="md">
        Start with our free plan and upgrade when you need more. No hidden fees.
      </Text>
      <Group justify="center" wrap="wrap" gap="xl">
        {plans}
      </Group>
    </Stack>
  );
};
