type Props = {
  children: React.ReactNode;
};

export default async function AuthLayout({ children }: Props) {
  return (
    <div className="min-h-screen w-full grid place-items-center p-4 md:p-6">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
