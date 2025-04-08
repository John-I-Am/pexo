import { Stack } from '@mantine/core';
import { alphabetCards } from './data';
import { DeckList } from '@/src/components/DeckList/DeckList';

export default function Page() {
  return (
    <Stack>
      <DeckList
        decks={[{ title: 'a', cards: alphabetCards.cards, tags: alphabetCards.tags } as any]}
        editable={false}
      />
    </Stack>
  );
}
