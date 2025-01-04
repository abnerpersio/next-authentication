import { LoggedUser } from '@/types/user';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';

type RequestWithUser = NextRequest & {
  user: LoggedUser;
};

type Handler = (
  request: RequestWithUser
) => Promise<NextResponse> | Promise<NextResponse<unknown>>;

export function withAuth(handler: Handler) {
  return async (request: NextRequest) => {
    const user = await auth();

    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const requestWithUser = request as RequestWithUser;
    requestWithUser.user = user;

    return handler(requestWithUser);
  };
}

export function withPermissions(handler: Handler, permissions: string[]) {
  return async (request: RequestWithUser) => {
    console.log('validate permissions', { user: request.user.id, permissions });

    return handler(request);
  };
}
