type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="min-h-screen w-full grid place-items-center p-4 md:p-6">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
