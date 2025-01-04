'use client';

import { useSignOut } from '@/hooks/use-sign-out';
import { Loader2Icon } from 'lucide-react';
import { useEffect } from 'react';

export function SignOut() {
  const { isLoading, handleSignOut } = useSignOut();

  useEffect(() => {
    handleSignOut();
  }, [handleSignOut]);

  if (isLoading) {
    return (
      <div className="min-h-screen grid place-items-center p-4 gap-4">
        <Loader2Icon className="animate-spin w-8 h-8 text-primary" />
      </div>
    );
  }

  return null;
}
