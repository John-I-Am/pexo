import { Stack } from '@mantine/core';
import { DashboardHeader } from '@/components/DashboardHeader/DashboardHeader';
import { fetchDeckById } from '@/app/api/actions/decks';

export default async function Page({ params }: { params: { id: string } }) {
  const deck = await fetchDeckById(params.id);
  return (
    <Stack justify="flex-start" h="100vh">
      <DashboardHeader>
        <h1>{deck?.title}</h1>
      </DashboardHeader>
    </Stack>
  );
}
