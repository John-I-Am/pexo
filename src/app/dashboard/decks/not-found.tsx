import { NotFoundMessage } from '@/components/NotFound/NotFound';
import { decksPath } from '@/lib/paths';
import { Container } from '@mantine/core';

export default function NotFound() {
  return (
    <Container>
      <NotFoundMessage />
    </Container>
  );
}
