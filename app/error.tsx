// app/error.tsx
'use client';

import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  
  // const router = useRouter();
  useEffect(() => {
    // router.push('/')
    reset()
  }, [error]);

  return null;
}