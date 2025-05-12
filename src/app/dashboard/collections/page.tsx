import { SimpleGrid, Stack } from '@mantine/core';
import { Deck } from '../_components/Deck/Deck';
import { alphabetCards } from './data';

const Page = () => {
  return (
    <Stack>
      <SimpleGrid cols={{ base: 2, sm: 3, lg: 4 }}>
        <Deck id="123" title="Animals" description="description1" cards={[]} tags={[]} isPrebuilt />
        <Deck id="123" title="Animals" description="descriptio4" cards={[]} tags={[]} isPrebuilt />
        <Deck id="123" title="Animals" description="description3" cards={[]} tags={[]} isPrebuilt />
        <Deck
          id="123"
          title="Animals"
          description="description2"
          cards={[]}
          tags={['123', 'abc', '234', '32e32e']}
          isPrebuilt
        />
      </SimpleGrid>
    </Stack>
  );
};

export default Page;
