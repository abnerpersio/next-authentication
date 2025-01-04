import { isAuthenticated } from '@/lib/auth';
import { redirect, RedirectType } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

export default async function PublicLayout({ children }: Props) {
  if (await isAuthenticated()) {
    return redirect('/', RedirectType.replace);
  }

  return <>{children}</>;
}
