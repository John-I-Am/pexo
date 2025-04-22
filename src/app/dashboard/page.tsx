import { Grid, GridCol, Stack } from '@mantine/core';
import { ProgressGrid } from '@/src/app/dashboard/_components/ProgressGrid/ProgressGrid';
import { GoalsGrid } from '@/src/app/dashboard/_components/GoalsGrid/GoalsGrid';
// import { auth } from '@/src/auth';
import { getCardsByUserId } from '../api/database/cards/queries';
import DeckSelector from './_components/DeckSelector/DeckSelector';

export default async function Page() {
  // const session = await auth();
  // const cards = await getCardsByUserId(session?.user?.id as any);
  // const sessionLog: any = await getCurrentDaySessionLog(session?.user?.id as any);
  // const sessionLogs: any = await getSessionLogs(session?.user?.id as any);

  return (
    <main>
      <Grid>
        <GridCol span={12}>
          <DeckSelector />
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
