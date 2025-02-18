import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { SessionProvider } from '@/components/providers/session-provider';
import { ToastProvider } from '@/components/ui/toast';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { authOptions } from '@/lib/auth';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Modern Web Uygulaması',
  description: 'Next.js ve Laravel ile geliştirilmiş modern web uygulaması',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ToastProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ToastProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
