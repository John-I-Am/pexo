import { SimpleGrid, Stack } from '@mantine/core';
import { Deck } from '../_components/Deck/Deck';
import { alphabetCards } from './data';

const Page = () => {
  return (
    <Stack>
      <SimpleGrid cols={{ base: 2, sm: 3, lg: 4 }}>
        <Deck
          id="123"
          title={alphabetCards.title}
          description={alphabetCards.description}
          cards={alphabetCards.cards}
          tags={alphabetCards.tags}
          isPrebuilt
        />
      </SimpleGrid>
    </Stack>
  );
};

export default Page;
