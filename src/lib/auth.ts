import { cookieKeys } from '@/config/cookies';
import { env } from '@/config/env';
import { LoggedUser } from '@/types/user';
import { JwtPayload, verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { prismaClient } from './database/prisma';

async function verifyAccessToken() {
  const accessToken = (await cookies()).get(cookieKeys.token)?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const { sub: userId } = verify(accessToken, env.jwtSecret) as JwtPayload;

    if (!userId) {
      return null;
    }

    return userId;
  } catch {
    return null;
  }
}

export async function isAuthenticated() {
  return !!(await verifyAccessToken());
}

export async function auth(): Promise<null | LoggedUser> {
  const userId = await verifyAccessToken();

  if (!userId) {
    return null;
  }

  await new Promise((resolve) => setTimeout(resolve, 3_000));

  const user = await prismaClient.user
    .findUnique({ where: { id: userId } })
    .catch(() => null);

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    username: user.username,
    name: user.name,
  };
}
