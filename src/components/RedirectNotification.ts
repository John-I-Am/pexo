'use client';

import { notifications } from '@mantine/notifications';
import { deleteCookieByKey, getCookieByKey } from '../app/api/cookies';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const RedirectNotification = () => {
  const pathname = usePathname();

  useEffect(() => {
    const showCookieNotification = async () => {
      const message = await getCookieByKey('notification');

      if (message) {
        notifications.show({
          message: message,
        });
        deleteCookieByKey('notification');
      }
    };

    showCookieNotification();
  }, [pathname]);

  return null;
};
