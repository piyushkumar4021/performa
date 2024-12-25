import EmployeesContextProvider from '@/app/contexts/employees-context-provider';
import SearchContextProvider from '@/app/contexts/search-context-provider';
import BackgroundPattern from '@/components/background-pattern';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { prisma } from '@/lib/client';
import { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
  const employees = await prisma.employees.findMany();

  return (
    <>
      <BackgroundPattern />
      <div className='flex flex-col min-h-screen max-w-[1100px] p-3 mx-auto'>
        <Header />

        <SearchContextProvider>
          <EmployeesContextProvider data={employees}>
            {children}
          </EmployeesContextProvider>
        </SearchContextProvider>

        <Footer />
      </div>
    </>
  );
}
