import BackgroundPattern from '@/components/background-pattern';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <BackgroundPattern />
      <div className='flex flex-col min-h-screen max-w-[1100px] p-3 mx-auto'>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}
