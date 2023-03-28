'use client';

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ padding: 10 }}>
      <h1>An error occurred</h1>
      <p>{error.message}</p>
      <a href="/">Go to the Home page</a>
      <div>
        <button onClick={() => reset()}>Try again</button>
      </div>
    </div>
  );
}
