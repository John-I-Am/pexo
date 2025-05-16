import { headers } from 'next/headers';
import { getDecks } from '@/app/api/database/decks/queries';
import { auth } from '@/lib/betterAuth/auth';
import { DeckWithCards } from '@/lib/prisma/types';
import { FlashCard } from './_components/Flashcard';

const Page = async () => {
  const session = (await auth.api.getSession({
    headers: await headers(),
  })) as any;

  const decks: DeckWithCards[] = await getDecks(session.userId);

  return <FlashCard decks={decks} />;
};

export default Page;
