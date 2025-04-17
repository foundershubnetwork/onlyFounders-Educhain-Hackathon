// app/error.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  
  const router = useRouter();
  useEffect(() => {
    router.push('/')
  }, [error]);

  return (
    <div style={{ backgroundColor: 'black', color: 'white', height: '100vh', padding: '2rem' }}>
      <h1>Oops, something went wrong.</h1>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}