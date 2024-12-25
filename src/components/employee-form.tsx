'use client';
import { Button } from './ui/button';
import { FormEvent, InputHTMLAttributes, useId, useState } from 'react';
import { useEmployeesContext } from '@/app/contexts/employees-context-provider';
import InputField from './input-field';

type TEmployeeFormProps = {
  toggleDialog: () => void;
};

const emptyEmployee = {
  age: 0,
  department: '',
  imageUrl: '',
  name: '',
  salary: 0,
};

export default function EmployeeForm({ toggleDialog }: TEmployeeFormProps) {
  const { selectedEmployee, handleAddEmployee, handleEditEmployee } =
    useEmployeesContext();
  const [employee, setEmployee] =
    useState<Omit<TEmployee, 'id'>>(getInitialEmployee);

  function getInitialEmployee() {
    if (selectedEmployee) {
      const { id, ...employee } = selectedEmployee;
      return employee;
    }
    return emptyEmployee;
  }
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!selectedEmployee) {
      handleAddEmployee(employee);
    } else {
      handleEditEmployee({ id: selectedEmployee.id, ...employee });
    }

    toggleDialog();
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col'>
      <div className='space-y-4'>
        <InputField
          label={`Employee's Name`}
          placeholder='John Wick'
          value={employee.name}
          onChange={({ target }) =>
            setEmployee((prev) => ({ ...prev, name: target.value }))
          }
          required
        />
        <InputField
          label={`Employee's Age`}
          type='number'
          placeholder='23'
          value={employee.age}
          onChange={({ target }) =>
            setEmployee((prev) => ({ ...prev, age: +target.value }))
          }
          required
        />
        <InputField
          label={`Employee's Image Url`}
          type='url'
          placeholder='https://example.com/image'
          value={employee.imageUrl}
          onChange={({ target }) =>
            setEmployee((prev) => ({ ...prev, imageUrl: target.value }))
          }
        />
        <InputField
          label={`Employee's Salary`}
          type='number'
          placeholder='50000'
          value={employee.salary}
          onChange={({ target }) =>
            setEmployee((prev) => ({ ...prev, salary: +target.value }))
          }
          required
        />
        <InputField
          label={`Employee's Department`}
          placeholder='Human Resource'
          value={employee.department}
          onChange={({ target }) =>
            setEmployee((prev) => ({ ...prev, department: target.value }))
          }
          required
        />
      </div>

      <Button className='ml-auto mt-5'>Save</Button>
    </form>
  );
}
