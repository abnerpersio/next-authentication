import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from './auth';

type Handler = (
  request: NextRequest,
  userId: string
) => Promise<NextResponse> | Promise<NextResponse<unknown>>;

export function withValidateToken(handler: Handler) {
  return async (request: NextRequest) => {
    const userId = await verifyAccessToken();

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return handler(request, userId);
  };
}
