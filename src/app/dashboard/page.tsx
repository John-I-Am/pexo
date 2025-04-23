import { Grid, GridCol, Stack } from '@mantine/core';
import { ProgressDisplay } from '@/src/app/dashboard/_components/ProgressDisplay/ProgressDisplay';
import { GoalsGrid } from '@/src/app/dashboard/_components/GoalsGrid/GoalsGrid';
import { getCardsByUserId } from '../api/database/cards/queries';
import DeckSelector from './_components/DeckSelector/DeckSelector';
import { auth } from '@/src/lib/betterAuth/auth';
import { headers } from 'next/headers';
import { getDecks } from '../api/database/decks/queries';

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const decks = await getDecks();
  // const cards = await getCardsByUserId(session?.user?.id as any);
  // const sessionLog: any = await getCurrentDaySessionLog(session?.user?.id as any);
  // const sessionLogs: any = await getSessionLogs(session?.user?.id as any);

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
      </Grid>
      <Stack>
        {/* <ProgressGrid cards={cards} />
        <GoalsGrid
          cards={cards}
          goal={sessionLog?.goal}
          userId={session?.user?.id}
          sessionLog={sessionLog}
          sessionLogs={sessionLogs}
        /> */}
      </Stack>
    </main>
  );
}
