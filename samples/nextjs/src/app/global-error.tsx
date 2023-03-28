'use client';

import ErrorPage from './error-page';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <head>Error</head>
      <body>
        <ErrorPage error={error} reset={reset} />
      </body>
    </html>
  );
}
