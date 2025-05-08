import { headers } from 'next/headers';
import { Deck } from '@prisma/client';
import { getDecks } from '@/app/api/database/decks/queries';
import { auth } from '@/lib/betterAuth/auth';
import { FlashCard } from './_components/Flashcard';

const Page = async () => {
  const session = (await auth.api.getSession({
    headers: await headers(),
  })) as any;

  const decks: Deck = await getDecks(session.userId);

  return <FlashCard decks={decks} />;
};

export default Page;
