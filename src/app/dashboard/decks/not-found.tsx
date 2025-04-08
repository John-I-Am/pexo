import { NotFoundMessage } from '@/src/components/NotFound/NotFound';
import { decksPath } from '@/src/lib/paths';
import { Container } from '@mantine/core';

export default function NotFound() {
  return (
    <Container>
      <NotFoundMessage />
    </Container>
  );
}
