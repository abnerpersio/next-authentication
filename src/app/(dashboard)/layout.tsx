import { AppBar } from './_components/app-bar';

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="w-full">
      <AppBar />

      <div className="flex flex-1 w-full">{children}</div>
    </div>
  );
}
