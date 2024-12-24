import EmployeeAddButton from '@/components/employee-add-button';
import EmployeeCount from '@/components/employee-count';
import EmployeeData from '@/components/employee-data';
import EmployeeList from '@/components/employee-list';
import SearchForm from '@/components/search-form';
import { Plus } from 'lucide-react';

export default function Page() {
  return (
    <main>
      <div className='flex justify-between items-center mt-5'>
        <BrandInfo />
        <EmployeeCount />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 md:grid-rows-[max-content_1fr] gap-4 mt-10'>
        <div className='md:col-start-1 md:row-start-1'>
          <SearchForm />
        </div>
        <div className='md:col-start-1 relative h-[400px]'>
          <EmployeeList />

          <EmployeeAddButton className={'absolute bottom-4 right-4'} />
        </div>
        <div className='md:row-start-1 md:col-span-2 md:row-span-2 min-h-[450px] md:h-full'>
          <EmployeeData />
        </div>
      </div>
    </main>
  );
}

const BrandInfo = () => {
  return (
    <section>
      <h1 className='font-bold tracking-wide text-xl'>Performa</h1>
      <p className='opacity-75 tracking-wide'>
        Simplify your workforce management
      </p>
    </section>
  );
};
