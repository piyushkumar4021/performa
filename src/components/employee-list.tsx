'use client';
import { useEmployeesContext } from '@/app/contexts/employees-context-provider';
import Card from './card';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function EmployeeList() {
  const { employees, selectedEmployeeId } = useEmployeesContext();
  const getClassName = (id: string) =>
    cn(
      'flex items-center gap-x-4 px-4 py-3 border-b-2 w-full hover:bg-black/10 transition-colors',
      {
        'bg-black/10': id === selectedEmployeeId,
      }
    );

  return (
    <Card>
      <ul className='h-[400px] overflow-hidden'>
        {employees.map(({ id, name, imageUrl }) => (
          <li key={id}>
            <button className={getClassName(id)}>
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
