import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

export function useSignOut() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.post('/api/auth/sign-out');
      router.push('/sign-in');
    } catch {
      toast.error('Failed to logout');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  return {
    isLoading,
    handleSignOut,
  };
}
