import { Group } from '@mantine/core';
import { FlashCard } from '@/components/FlashCard/FlashCard';

const dummyData = {
  id: '123',
  front: 'Welcome',
  back: 'To greet someone with pleasure and hospitality',
  level: '1',
  reviewCount: 0,
};

export const Demo = () => {
  return (
    <Group bdrs="xl" bg="dark-navy" m="xl" p={100} id="demo">
      <FlashCard {...dummyData} />
    </Group>
  );
};
