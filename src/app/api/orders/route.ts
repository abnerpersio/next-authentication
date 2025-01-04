import { withAuth, withPermissions } from '@/lib/with-auth';
import { NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';

export const GET = withAuth(
  withPermissions(
    async (request) => {
      return NextResponse.json({
        userId: request.user.id,
        orders: [
          { id: randomUUID() },
          { id: randomUUID() },
          { id: randomUUID() },
        ],
      });
    },
    ['orders.list']
  )
);
