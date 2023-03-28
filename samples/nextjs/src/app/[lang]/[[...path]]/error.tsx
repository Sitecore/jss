'use client';

import ErrorPage from 'src/app/error-page';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return <ErrorPage error={error} reset={reset} />;
}
