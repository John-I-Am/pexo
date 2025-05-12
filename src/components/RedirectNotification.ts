'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { deleteCookieByKey, getCookieByKey } from '../app/api/cookies';

export const RedirectNotification = () => {
  const pathname = usePathname();

  useEffect(() => {
    const showCookieNotification = async () => {
      const message = await getCookieByKey('notification');

      if (message) {
        notifications.show({
          message,
        });
        deleteCookieByKey('notification');
      }
    };

    showCookieNotification();
  }, [pathname]);

  return null;
};
