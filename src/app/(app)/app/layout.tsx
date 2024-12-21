import EmployeesContextProvider from '@/app/contexts/employees-context-provider';
import SearchContextProvider from '@/app/contexts/search-context-provider';
import BackgroundPattern from '@/components/background-pattern';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
  const response = await fetch(
    'https://bytegrad.com/course-assets/projects/petsoft/api/pets'
  );

  if (!response.ok) {
    throw new Error('Error in fetching employees');
  }

  const data: TEmployee[] = await response.json();

  return (
    <>
      <BackgroundPattern />
      <div className='flex flex-col min-h-screen max-w-[1100px] p-3 mx-auto'>
        <Header />

        <SearchContextProvider>
          <EmployeesContextProvider data={data}>
            {children}
          </EmployeesContextProvider>
        </SearchContextProvider>

        <Footer />
      </div>
    </>
  );
}
