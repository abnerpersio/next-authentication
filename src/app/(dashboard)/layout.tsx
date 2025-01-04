import { SignOut } from '@/components/sign-out';
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
    <div className="w-full">
      <AppBar />

      <div className="flex flex-1 w-full">{children}</div>
    </div>
  );
}
