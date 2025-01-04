import { cookieKeys } from '@/config/cookies';
import { env } from '@/config/env';
import { prismaClient } from '@/lib/database/prisma';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  name: z
    .string({ required_error: 'Required field' })
    .trim()
    .min(1, 'Invalid name'),
  email: z
    .string({ required_error: 'Required field' })
    .trim()
    .email('Invalid email address'),
  username: z.string().trim().optional().nullable(),
  password: z
    .string({ required_error: 'Required field' })
    .trim()
    .min(6, 'Password must have at least 6 characters'),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { data, error } = schema.safeParse(body);

  if (!!error) {
    return NextResponse.json(
      { errors: error.issues.map((error) => error.message) },
      { status: 400 }
    );
  }

  const { email, name, username, password } = data;

  const emailAlreadyExists = await prismaClient.user.findUnique({
    where: { email },
    select: { email: true },
  });

  if (!!emailAlreadyExists) {
    return NextResponse.json(
      { message: 'Email already in use' },
      { status: 409 }
    );
  }

  const hashedPassword = await hash(password, 12);

  const user = await prismaClient.user.create({
    data: { email, name, username, password: hashedPassword },
  });

  const accessToken = sign({ sub: user.id }, env.jwtSecret, {
    expiresIn: '7d',
  });

  const response = new NextResponse(null, { status: 204 });
  response.cookies.set(cookieKeys.token, accessToken, {
    httpOnly: true,
    maxAge: env.cookieExpInSeconds,
    path: '/',
    sameSite: 'strict',
    secure: true,
  });

  return response;
}
