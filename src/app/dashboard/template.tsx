import { RedirectNotification } from '@/components/RedirectNotification';
import { SessionLogRecorder } from '@/components/SessionLogRecorder';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <>{children}</>
      <RedirectNotification />
      <SessionLogRecorder />
    </>
  );
}
