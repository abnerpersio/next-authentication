import { SignOut } from '@/components/sign-out';
import { AuthProvider } from '@/contexts/auth';
import { auth } from '@/lib/auth';

type Props = {
  children: React.ReactNode;
};

export default async function PrivateLayout({ children }: Props) {
  const user = await auth();

  if (!user) {
    return <SignOut />;
  }

  return <AuthProvider user={user}>{children}</AuthProvider>;
}
