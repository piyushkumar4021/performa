import { ReactNode } from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import EmployeeForm from './employee-form';

type TEmployeeEditButtonProps = {
  className?: string;
  children: ReactNode;
};

export default function EmployeeEditButton({
  className,
  children,
}: TEmployeeEditButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={className}>{children}</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit Employee</DialogTitle>
          <DialogDescription>
            Edit your employee profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <EmployeeForm />
      </DialogContent>
    </Dialog>
  );
}
