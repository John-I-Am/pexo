'use client';

import { ErrorBoundary } from '@/src/components/ErrorBoundary/ErrorBoundary';

export default function Error({ error }: { error: Error }) {
  return <ErrorBoundary />;
}
