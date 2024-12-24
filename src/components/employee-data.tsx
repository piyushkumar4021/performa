'use client';
import { useEmployeesContext } from '@/app/contexts/employees-context-provider';
import Image from 'next/image';
import Card from './card';
import EmployeeEditButton from './employee-edit-button';
import EmployeeRemoveButton from './employee-remove-button';

export default function EmployeeData() {
  const { selectedEmployee } = useEmployeesContext();

  return (
    <Card>
      <div className='flex flex-col h-full pb-3 md:pb-6'>
        {!selectedEmployee && <EmptyView />}
        {selectedEmployee && (
          <>
            <TopBar />
            <Info />
            <Description />
          </>
        )}
      </div>
    </Card>
  );
}

const EmptyView = () => {
  return (
    <div className='m-auto text-base animate-pulse'>
      Click on an Employee to see its details
    </div>
  );
};

const TopBar = () => {
  const { selectedEmployee, handleRemoveEmployee } = useEmployeesContext();
  if (!selectedEmployee) return;

  return (
    <div className='flex items-center gap-x-3 px-5 py-4 border-b border-[rgba(0,0,0,0.08)] bg-[#f1f3f5]'>
      <Image
        src={selectedEmployee.imageUrl}
        width={75}
        height={75}
        alt={`${selectedEmployee.name}'s Photo`}
        className='w-[75px] h-[75px] object-cover rounded-full'
      />
      <h2 className='tracking-wide font-semibold text-2xl'>
        {selectedEmployee.name}
      </h2>

      <div className='ml-auto space-x-3'>
        <EmployeeEditButton>Edit</EmployeeEditButton>
        <EmployeeRemoveButton
          onClick={() => handleRemoveEmployee(selectedEmployee.id)}
        >
          Remove
        </EmployeeRemoveButton>
      </div>
    </div>
  );
};

const Info = () => {
  const { selectedEmployee } = useEmployeesContext();
  if (!selectedEmployee) return;

  return (
    <div className='flex text-center py-7 justify-around'>
      <div>
        <h3 className='font-medium'>OWNER NAME</h3>
        <p>{selectedEmployee.name}</p>
      </div>
      <div>
        <h3 className='font-medium'>AGE</h3>
        <p>24</p>
      </div>
    </div>
  );
};

const Description = () => {
  return (
    <div className='bg-[#f1f3f5] px-4 py-3 rounded-lg mx-3 md:mx-6 border border-[rgba(0,0,0,0.08)] flex-1'>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam incidunt
      officia distinctio deserunt sit, mollitia doloremque ad iure perferendis
      inventore cumque accusantium placeat repudiandae corrupti temporibus
      tempore nostrum, dolores consectetur rem minima obcaecati beatae.
    </div>
  );
};
