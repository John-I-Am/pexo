/* eslint-disable no-console */
'use client';

import dayjs from '@/lib/dayjs';
import { useEffect } from 'react';
import { setCookieByKey } from '@/app/api/cookies';
import { upsertSessionLog } from '@/app/api/database/sessions/mutations';
import { authClient } from '@/lib/betterAuth/authClient';

export const SessionLogRecorder = () => {
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (!session?.user?.id) {
      return undefined;
    }

    const setSessionLog = async () => {
      try {
        await upsertSessionLog(session.user.id, dayjs().startOf('day').toDate());
        await setCookieByKey('localDate', dayjs().startOf('day').toISOString());
      } catch (error) {
        console.error('Failed to upsert session log:', error);
      }
    };

    setSessionLog();
  }, [session]);

  return null;
};
