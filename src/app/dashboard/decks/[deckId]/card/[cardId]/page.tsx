import { Stack } from '@mantine/core';
import { getCardById } from '@/src/app/api/database/cards/queries';
import { CardForm } from './_components/CardForm';

type existingCardPageProps = {
  params: Promise<{
    deckId: string;
    cardId: string;
  }>;
};

export default async function Page(props: existingCardPageProps) {
  const params = await props.params;
  const { deckId, cardId } = params;
  const card = await getCardById(cardId);
  return (
    <Stack>
      <CardForm deckId={deckId} card={card} />
    </Stack>
  );
}
