'use client';
import { Button } from './ui/button';
import { useEmployeesContext } from '@/app/contexts/employees-context-provider';
import InputField from './input-field';
import { flushSync, useFormStatus } from 'react-dom';
import Spinner from './spinner';
import { UNKOWN_IMAGE_URL } from '@/lib/constants';
import { EmployeeEssentials } from '@/lib/types';

type TEmployeeFormProps = {
  toggleDialog: () => void;
  actionType: 'add' | 'edit' | 'remove';
};

export default function EmployeeForm({
  toggleDialog,
  actionType,
}: TEmployeeFormProps) {
  const { selectedEmployee, handleAddEmployee, handleEditEmployee } =
    useEmployeesContext();

  const handleAction = async (formData: FormData) => {
    flushSync(toggleDialog);

    const employee: EmployeeEssentials = {
      name: formData.get('name') as string,
      age: +(formData.get('age') as string),
      imageUrl: (formData.get('imageUrl') as string) || UNKOWN_IMAGE_URL,
      department: formData.get('department') as string,
      salary: +(formData.get('salary') as string),
    };

    if (actionType === 'add') {
      handleAddEmployee(employee);
    } else if (actionType === 'edit') {
      handleEditEmployee(selectedEmployee!.id, employee);
    }
  };

  return (
    <form action={handleAction} className='flex flex-col'>
      <div className='space-y-4'>
        <InputField
          name='name'
          label={`Employee's Name`}
          placeholder='John Wick'
          defaultValue={actionType === 'edit' ? selectedEmployee?.name : ''}
          required
        />
        <InputField
          name='age'
          label={`Employee's Age`}
          type='number'
          placeholder='23'
          defaultValue={actionType === 'edit' ? selectedEmployee?.age : ''}
          required
        />
        <InputField
          name='imageUrl'
          label={`Employee's Image Url`}
          type='url'
          placeholder='https://example.com/image'
          defaultValue={actionType === 'edit' ? selectedEmployee?.imageUrl : ''}
          disabled
        />
        <InputField
          name='salary'
          label={`Employee's Salary`}
          type='number'
          placeholder='50000'
          defaultValue={actionType === 'edit' ? selectedEmployee?.salary : ''}
          required
        />
        <InputField
          name='department'
          label={`Employee's Department`}
          placeholder='Human Resource'
          defaultValue={
            actionType === 'edit' ? selectedEmployee?.department : ''
          }
          required
        />
      </div>

      <SubmitButton actionType={actionType} />
    </form>
  );
}

const SubmitButton = ({
  actionType,
}: {
  actionType: 'add' | 'edit' | 'remove';
}) => {
  const { pending } = useFormStatus();

  return (
    <Button className='flex items-center ml-auto mt-5' disabled={pending}>
      {pending && <Spinner />}
      {actionType === 'add' ? 'Add Employee' : 'Edit Employee'}
    </Button>
  );
};
