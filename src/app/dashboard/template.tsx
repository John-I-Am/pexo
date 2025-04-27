import { RedirectNotification } from '@/components/RedirectNotification';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <>{children}</>
      <RedirectNotification />
    </>
  );
}
