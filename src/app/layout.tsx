import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/contexts/theme';
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
    <html lang="pt-br" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
