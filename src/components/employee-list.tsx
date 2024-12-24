'use client';
import { useEmployeesContext } from '@/app/contexts/employees-context-provider';
import Card from './card';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useSearchContext } from '@/app/contexts/search-context-provider';

export default function EmployeeList() {
  const { employees, selectedEmployeeId, handleChangeSelectedEmployeeId } =
    useEmployeesContext();
  const { query } = useSearchContext();

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(query)
  );

  const getClassName = (id: string) =>
    cn(
      'flex items-center gap-x-4 px-4 py-3 border-b-2 w-full bg-[#f1f3f5] hover:bg-black/5 transition-colors',
      {
        'bg-black/10': id === selectedEmployeeId,
      }
    );

  return (
    <Card>
      <ul className='h-full overflow-y-auto'>
        {filteredEmployees.map(({ id, name, imageUrl }) => (
          <li key={id}>
            <button
              onClick={() => handleChangeSelectedEmployeeId(id)}
              className={getClassName(id)}
            >
              <Image
                className='w-[48px] h-[48px] object-cover rounded-full'
                src={imageUrl}
                width={48}
                height={48}
                alt={`${name}'s Photo`}
              />
              <span className='text-base tracking-wide'>{name}</span>
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
