import Card from '@/components/card';
import EmployeeData from '@/components/employee-data';
import EmployeeList from '@/components/employee-list';
import SearchForm from '@/components/search-form';

export default function Page() {
  return (
    <main>
      <div className='flex justify-between items-center mt-5'>
        <BrandInfo />
        <EmployeeCount />
      </div>

      <div className='grid grid-cols-3 grid-rows-[max-content_1fr] gap-4 mt-10'>
        <div className='col-start-1 row-start-1'>
          <SearchForm />
        </div>
        <div className='col-start-1'>
          <EmployeeList />
        </div>
        <div className='row-start-1 col-span-2 row-span-2'>
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

const EmployeeCount = () => {
  return (
    <section className='text-center'>
      <p className='font-bold text-2xl'>0</p>
      <p>Employees</p>
    </section>
  );
};
