import dayjs from '@/lib/dayjs';
import { headers } from 'next/headers';
import { SessionLog } from '@prisma/client';
import { Grid, GridCol, ScrollArea } from '@mantine/core';
import { ProgressDisplay } from '@/app/dashboard/_components/ProgressDisplay/ProgressDisplay';
import { DeckList } from '@/components/DeckList/DeckList';
import { auth } from '@/lib/betterAuth/auth';
import { getCardsByUserId } from '../api/database/cards/queries';
import { getDecks } from '../api/database/decks/queries';
import { getSessionLog } from '../api/database/sessions/queries';
import { GoalDisplay } from './_components/GoalDisplay/GoalDisplay';
import { OverviewDisplay } from './_components/OverviewDisplay/OverviewDisplay';

export default async function Page() {
  const session = (await auth.api.getSession({
    headers: await headers(),
  })) as any;

  const decks = await getDecks(session?.user.id);
  const cards = await getCardsByUserId(session.user.id);
  const sessionLog = await getSessionLog(session?.user?.id, dayjs().startOf('day').toDate());

  return (
    <main>
      <ScrollArea p="md">
        <Grid
          type="container"
          breakpoints={{ xs: '100px', sm: '200px', md: '500px', lg: '800px', xl: '1000px' }}
        >
          <GridCol span={12}>
            <OverviewDisplay decks={decks} goal={sessionLog?.goal ?? 50} />
          </GridCol>
          <GridCol span={{ base: 12, xl: 6 }}>
            <ProgressDisplay decks={decks} />
          </GridCol>
          <GridCol span={{ base: 12, xl: 6 }}>
            <GoalDisplay cards={cards} sessionLog={sessionLog as SessionLog} />
          </GridCol>
          <GridCol span={{ base: 12 }}>
            <DeckList decks={decks} isPrebuilt={false} />
          </GridCol>
        </Grid>
      </ScrollArea>
    </main>
  );
}
