import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Performa - Simplifying Workforce Management.',
  description:
    'Performa is an innovative platform designed to streamline employee data management, optimize HR workflows, and enhance workforce performance, empowering organizations to achieve their goals efficiently.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} bg-[#e9ecef] min-h-screen text-sm text-[#f8f9fa]`}
      >
        {children}
      </body>
    </html>
  );
}
