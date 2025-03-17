import { Metadata } from 'next';

import '@/styles/vars.scss';
import '@/styles/global.scss';

import { Inter } from 'next/font/google';

import { Container } from '@/components/layout/Container';
import RootProvider from '@/components/providers/root.provider';
import { Header } from '@/components/ui/Header';
import { Sidebar } from '@/components/ui/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `TypeScript Next.js`,
  description: `TypeScript Next.js`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootProvider>
          <Header />
          <Sidebar />
          <Container>{children}</Container>
        </RootProvider>
        <div id="tooltip-root" />
        <div id="modal-root" />
      </body>
    </html>
  );
}
