import { Container } from '@mantine/core';
import { CardEditor } from '@/components/CardEditor/CardEditor';

export default function Page({ params }: { params: { deckId: string } }) {
  const { deckId } = params;
  return (
    <Container w="100%">
      <CardEditor deckId={deckId} />
    </Container>
  );
}
