'use client';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';
import { DialogHeader } from './ui/dialog';
import { ReactNode, useState } from 'react';
import { Plus } from 'lucide-react';
import EmployeeForm from './employee-form';

type TEmployeeAddButtonProps = {
  className?: string;
  children?: ReactNode;
};

export default function EmployeeAddButton({
  children,
  className,
}: TEmployeeAddButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => setIsOpen((prev) => !prev);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={className} size='icon'>
          {children ? children : <Plus />}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add an Employee</DialogTitle>
          <DialogDescription>
            Add employee details. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <EmployeeForm toggleDialog={toggleIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
