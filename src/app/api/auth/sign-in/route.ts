import { cookieKeys } from '@/config/cookies';
import { env } from '@/config/env';
import { prismaClient } from '@/lib/database/prisma';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  email: z
    .string({ required_error: 'Required field' })
    .trim()
    .email('Invalid email address'),
  password: z
    .string({ required_error: 'Required field' })
    .trim()
    .min(6, 'Password must have at least 6 characters'),
});

const COOKIE_EXPIRATION_IN_SECONDS = 60 * 60 * 24 * 7;

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { data, error } = schema.safeParse(body);

  if (!!error) {
    return NextResponse.json(
      { errors: error.issues.map((error) => error.message) },
      { status: 400 }
    );
  }

  const { email, password } = data;

  const user = await prismaClient.user.findUnique({
    where: { email },
    select: { id: true, email: true, password: true },
  });

  if (!user) {
    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );
  }

  const isValidPassword = await compare(password, user.password);

  if (!isValidPassword) {
    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );
  }

  const accessToken = sign({ sub: user.id }, env.jwtSecret, {
    expiresIn: '7d',
  });

  const response = new NextResponse(null, { status: 204 });
  response.cookies.set(cookieKeys.token, accessToken, {
    httpOnly: true,
    maxAge: COOKIE_EXPIRATION_IN_SECONDS,
    path: '/',
    sameSite: 'strict',
    secure: true,
  });

  return response;
}
