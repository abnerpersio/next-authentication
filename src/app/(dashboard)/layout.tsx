import { SignOut } from '@/components/sign-out';
import { AuthProvider } from '@/contexts/auth';
import { auth } from '@/lib/auth';
import { AppBar } from './_components/app-bar';

type Props = {
  children: React.ReactNode;
};

export default async function DashboardLayout({ children }: Props) {
  const user = await auth();

  if (!user) {
    return <SignOut />;
  }

  return (
    <AuthProvider user={user}>
      <div className="w-full">
        <AppBar />

        <div className="flex flex-1 w-full">{children}</div>
      </div>
    </AuthProvider>
  );
}
