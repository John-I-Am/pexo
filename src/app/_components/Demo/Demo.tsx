'use client';

import { FlashCard } from '@/components/FlashCard/FlashCard';
import { Tabs, Title } from '@mantine/core';

import classes from './Demo.module.css';

const dummyData = {
  id: '123',
  front: 'Welcome',
  back: 'To greet someone with pleasure and hospitality',
  level: '1',
  reviewCount: 0,
};

const dummyData2 = {
  id: '123',
  front: 'TBD',
  back: 'TBD',
  level: '5',
  reviewCount: 99,
};

export function Demo() {
  return (
    <Tabs defaultValue="first" py="xl" classNames={classes}>
      <Tabs.List justify="flex-end">
        <Title order={2} className={classes.title}>
          Demo
        </Title>
        <Tabs.Tab value="first">Classic</Tabs.Tab>
        <Tabs.Tab value="second">Cloze</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="first">
        <FlashCard {...dummyData} />
      </Tabs.Panel>
      <Tabs.Panel value="second">
        <FlashCard {...dummyData2} />
      </Tabs.Panel>
    </Tabs>
  );
}
