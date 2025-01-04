import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Live #051',
  description: 'Authehntication with Nextjs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="w-full h-full">
      <body className="antialiased w-full h-full">{children}</body>
    </html>
  );
}
