import { Container } from '@mantine/core';
import { CardEditor } from '@/components/CardEditor/CardEditor';

export default function Page({ params }: { params: { deckId: string } }) {
  const { deckId } = params;
  return (
    <Container>
      <CardEditor deckId={deckId} />
    </Container>
  );
}
