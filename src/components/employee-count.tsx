'use client';

import { useEmployeesContext } from '@/app/contexts/employees-context-provider';

const EmployeeCount = () => {
  const { totalCount } = useEmployeesContext();

  return (
    <section className='text-center'>
      <p className='font-bold text-2xl'>{totalCount}</p>
      <p>Employees</p>
    </section>
  );
};

export default EmployeeCount;
