export const homePath = () => '/';
export const loginPath = () => '/login';

export const dashboardPath = () => '/dashboard';
export const studyPath = () => '/dashboard/study';
export const collectionsPath = () => '/dashboard/collections';

export const deckPath = (deckId: string) => `/dashboard/decks/${deckId}`;

export const newCardPath = (deckId: string) => `/dashboard/decks/${deckId}/card`;
export const existingCardPath = (deckId: string, cardId: string) =>
  `/dashboard/decks/${deckId}/card/${cardId}`;

export const accountPath = () => '/dashboard/account';
