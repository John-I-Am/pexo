import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import React from 'react';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider, rem } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { GoalSlider } from '../components/GoalSlider/GoalSlider';
import { theme } from '../theme';
import { ActiveDeckProvider } from './contexts/ActiveDeckProvider';
import { TagsManagerModal } from './dashboard/decks/[deckId]/_components/TagsManagerModal/TagsManagerModal';

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
              modals={{
                goalSliderModal: GoalSlider,
                tagsManager: TagsManagerModal,
              }}
              modalProps={{
                radius: 'md',

                // This removes issue where content peaks above header on scroll. However, it shifts header on scroll.
                // No idea how to fix this, does not seem possible to adjust modal root spacing.
                styles: {
                  header: {
                    top: -16,
                  },

                  // Modal manager's Modals don't have access to theme styling? Have to set it manually.
                  title: {
                    fontWeight: 500,
                    fontSize: rem(20),
                  },
                },
              }}
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
