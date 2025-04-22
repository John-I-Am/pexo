import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { theme } from '../theme';
import { IconPicker } from './dashboard/decks/_components/IconPicker/IconPicker';
import { SelectorModal } from './dashboard/_components/SelectorModal/SelectorModal';
import { ActiveDeckProvider } from './contexts/ActiveDeckProvider';

export const metadata = {
  title: 'Pexo',
  description: 'Spaced repetition flashcards',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <ActiveDeckProvider>
            <ModalsProvider
              modals={{ iconPicker: IconPicker, selectorModal: SelectorModal }}
              modalProps={{ radius: 'md' }}
            >
              {children}
              <Notifications />
            </ModalsProvider>
          </ActiveDeckProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
