import { isAuthenticated } from '@/lib/auth';
import { redirect, RedirectType } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

export default async function AuthLayout({ children }: Props) {
  if (await isAuthenticated()) {
    return redirect('/', RedirectType.replace);
  }

  return (
    <div className="min-h-screen w-full grid place-items-center p-4 md:p-6">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
