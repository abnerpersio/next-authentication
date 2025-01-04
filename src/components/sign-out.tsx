'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function SignOut() {
  const router = useRouter();

  useEffect(() => {
    async function handleSignout() {
      try {
        router.push('/sign-in');
        await axios.post('/api/auth/sign-out');
      } catch {}
    }

    handleSignout();
  }, []);

  return null;
}
