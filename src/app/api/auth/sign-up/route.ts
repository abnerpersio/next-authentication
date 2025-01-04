import { prismaClient } from '@/lib/database/prisma';
import { hash } from 'bcryptjs';
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

  const { email, name, password } = data;

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

  await prismaClient.user.create({
    data: { email, name, password: hashedPassword },
  });

  return new NextResponse(null, { status: 204 });
}
