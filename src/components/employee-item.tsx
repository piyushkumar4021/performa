import { useEmployeesContext } from '@/app/contexts/employees-context-provider';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function EmployeeItem({ employee }: { employee: TEmployee }) {
  const { selectedEmployeeId, handleChangeSelectedEmployeeId } =
    useEmployeesContext();

  const getClassName = (id: string) => {
    return cn(
      'flex items-center gap-x-4 px-4 py-3 border-b-2 w-full bg-[#f1f3f5] hover:bg-black/5 transition-colors',
      {
        'bg-black/10': id === selectedEmployeeId,
      }
    );
  };

  return (
    <button
      onClick={() => handleChangeSelectedEmployeeId(employee.id)}
      className={getClassName(employee.id)}
    >
      <Image
        className='w-[48px] h-[48px] object-cover rounded-full'
        src={employee.imageUrl}
        width={144}
        height={144}
        alt={`${employee.name}'s Photo`}
        priority
      />
      <span className='text-base tracking-wide'>{employee.name}</span>
    </button>
  );
}
