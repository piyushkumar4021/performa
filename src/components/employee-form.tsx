'use client';
import { Button } from './ui/button';
import { useEmployeesContext } from '@/app/contexts/employees-context-provider';

export default function EmployeeForm({ toggleDialog }) {
  const { selectedEmployee, handleAddEmployee } = useEmployeesContext();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const employee: Omit<TEmployee, 'id'> = Object.fromEntries(
          data.entries()
        );

        handleAddEmployee(employee);
        toggleDialog();
      }}
      className='text-black flex flex-col'
    >
      <div className='mb-3'>
        <label className='block mb-1' htmlFor='name'>
          Employee&apos;s Name
        </label>
        <input
          className='block border border-black/50 px-3 py-2 rounded-md w-full'
          id='name'
          type='text'
          name='name'
          value={selectedEmployee ? selectedEmployee.name : ''}
        />
      </div>
      <div className='mb-3'>
        <label className='block mb-1' htmlFor='age'>
          Employee&apos;s Age
        </label>
        <input
          className='block border border-black/50 px-3 py-2 rounded-md w-full'
          id='age'
          type='number'
          name='age'
          value={selectedEmployee ? selectedEmployee.age : ''}
        />
      </div>
      <div className='mb-3'>
        <label className='block mb-1' htmlFor='photo'>
          Photo Url
        </label>
        <input
          type='url'
          className='block border border-black/50 px-3 py-2 rounded-md w-full'
          name='imageUrl'
          disabled
          value={selectedEmployee ? selectedEmployee.imageUrl : ''}
        />
      </div>

      <Button className='ml-auto mt-2'>Save</Button>
    </form>
  );
}
