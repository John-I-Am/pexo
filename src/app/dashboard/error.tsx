'use client';

import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Error({ error }: { error: Error }) {
  return <ErrorBoundary />;
}
