import { getAccessToken } from '@/lib/auth';
import { redirect, RedirectType } from 'next/navigation';
import { AppBar } from './_components/app-bar';

type Props = {
  children: React.ReactNode;
};

export default async function DashboardLayout({ children }: Props) {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return redirect('/sign-in', RedirectType.replace);
  }

  return (
    <div className="w-full">
      <AppBar />

      <div className="flex flex-1 w-full">{children}</div>
    </div>
  );
}
