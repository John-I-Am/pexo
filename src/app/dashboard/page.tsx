import { Grid, GridCol } from '@mantine/core';
import { ProgressDisplay } from '@/app/dashboard/_components/ProgressDisplay/ProgressDisplay';
import { getCardsByUserId } from '../api/database/cards/queries';
import DeckSelector from './_components/DeckSelector/DeckSelector';
import { auth } from '@/lib/betterAuth/auth';
import { headers } from 'next/headers';
import { getDecks } from '../api/database/decks/queries';
import { getSessionLogs } from '../api/database/sessions/queries';
import { GoalDisplay } from './_components/GoalDisplay/GoalDisplay';

export default async function Page() {
  const session = (await auth.api.getSession({
    headers: await headers(),
  })) as any;

  const decks = await getDecks(session?.userId);
  const cards = await getCardsByUserId(session.user.id);
  const sessionLogs = await getSessionLogs(session?.user?.id);

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
          <GoalDisplay cards={cards} sessionLog={sessionLogs[sessionLogs.length - 1]} />
        </GridCol>
      </Grid>
    </main>
  );
}
