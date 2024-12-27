'use client';
import { Button } from './ui/button';
import { useEmployeesContext } from '@/app/contexts/employees-context-provider';
import InputField from './input-field';
import { addEmployee, editEmployee } from '@/actions/actions';
import { toast } from 'sonner';
import { useFormStatus } from 'react-dom';
import Spinner from './spinner';

type TEmployeeFormProps = {
  toggleDialog: () => void;
  actionType: 'add' | 'edit' | 'remove';
};

export default function EmployeeForm({
  toggleDialog,
  actionType,
}: TEmployeeFormProps) {
  const { selectedEmployee } = useEmployeesContext();

  const handleAction = async (formData: FormData) => {
    let response;

    if (actionType === 'add') {
      response = await addEmployee(formData);
    } else if (actionType === 'edit') {
      response = await editEmployee(selectedEmployee?.id, formData);
    }

    if (response) {
      toast.error(response.message);
      return;
    }

    toggleDialog();
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

const SubmitButton = ({ actionType }) => {
  const { pending } = useFormStatus();

  return (
    <Button className='flex items-center ml-auto mt-5' disabled={pending}>
      {pending && <Spinner />}
      {actionType === 'add' ? 'Add Employee' : 'Edit Employee'}
    </Button>
  );
};
