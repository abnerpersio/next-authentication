import { cookieKeys } from '@/config/cookies';
import { cookies } from 'next/headers';

export async function getAccessToken() {
  return (await cookies()).get(cookieKeys.token)?.value;
}
