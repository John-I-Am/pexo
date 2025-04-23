import { Grid, GridCol, Stack } from '@mantine/core';
import { ProgressDisplay } from '@/src/app/dashboard/_components/ProgressDisplay/ProgressDisplay';
import { GoalsGrid } from '@/src/app/dashboard/_components/GoalsGrid/GoalsGrid';
import { getCardsByUserId } from '../api/database/cards/queries';
import DeckSelector from './_components/DeckSelector/DeckSelector';
import { auth } from '@/src/lib/betterAuth/auth';
import { headers } from 'next/headers';
import { getDecks } from '../api/database/decks/queries';
import { getSessionLogs } from '../api/database/sessions/queries';

export default async function Page() {
  const session = (await auth.api.getSession({
    headers: await headers(),
  })) as any;

  const decks = await getDecks();
  const sessionLogs = await getSessionLogs(session?.user?.id);
  const cards = await getCardsByUserId(session?.user?.id as any);

  return (
    <main>
      <Grid
        type="container"
        breakpoints={{ xs: '100px', sm: '200px', md: '500px', lg: '800px', xl: '1000px' }}
      >
        <GridCol span={12}>
          <DeckSelector decks={decks} />
        </GridCol>
        <GridCol span={{ base: 12, xl: 6 }}>
          <ProgressDisplay decks={decks} />
        </GridCol>
        <GridCol span={{ base: 12, xl: 6 }}>
          <GoalsGrid sessionLogs={sessionLogs} cards={cards} />
        </GridCol>
      </Grid>
    </main>
  );
}
