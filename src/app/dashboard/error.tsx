'use client';

import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';

export default function Error({ error }: { error: Error }) {
  return <ErrorBoundary />;
}
