import { AuthContext } from '@/contexts/auth';
import { use } from 'react';

export function useAuth() {
  const value = use(AuthContext);

  if (!value) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return value;
}
