'use client';

import { LoggedUser } from '@/types/user';
import { createContext } from 'react';

type AuthContextValue = {
  user: LoggedUser;
};

export const AuthContext = createContext({} as AuthContextValue);

type Props = {
  children: React.ReactNode;
  user: LoggedUser;
};

export function AuthProvider({ children, user }: Props) {
  return <AuthContext value={{ user }}>{children}</AuthContext>;
}
