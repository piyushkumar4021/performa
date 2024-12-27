'use client';

import { ButtonHTMLAttributes, ReactNode, useState } from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { DialogHeader } from './ui/dialog';
import EmployeeForm from './employee-form';
import { removeEmployee } from '@/actions/actions';
import { useEmployeesContext } from '@/app/contexts/employees-context-provider';
import Spinner from './spinner';

type TEmployeeActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  actionType: 'add' | 'edit' | 'remove';
  children: ReactNode;
  className?: string;
};

export default function EmployeeActionButton({
  actionType,
  children,
  className,
  ...props
}: TEmployeeActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen((prev) => !prev);
  const { selectedEmployeeId } = useEmployeesContext();
  const [pending, setPending] = useState(false);

  if (actionType === 'add' || actionType === 'edit') {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className={className} {...props}>
            {children}
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>
              {actionType === 'add' ? 'Add' : 'Edit'} an Employee
            </DialogTitle>
            <DialogDescription />
          </DialogHeader>

          <EmployeeForm actionType={actionType} toggleDialog={toggleIsOpen} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Button
      onClick={async () => {
        setPending(true);
        await removeEmployee(selectedEmployeeId);
        setPending(false);
      }}
      variant='destructive'
      disabled={pending}
      {...props}
    >
      {pending && <Spinner />}
      {children}
    </Button>
  );
}
