import { Container } from '@mantine/core';
import { CardEditor } from '@/components/CardEditor/CardEditor';
import { fetchCardById } from '@/app/api/actions/cards';

export default async function Page({ params }: { params: { deckId: string; cardId: string } }) {
  const { deckId } = params;
  const card = await fetchCardById(params.cardId);
  return (
    <Container w="100%">
      <CardEditor deckId={deckId} card={card} />
    </Container>
  );
}
