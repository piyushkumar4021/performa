import { ReactNode, useState } from 'react';
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
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => setIsOpen((prev) => !prev);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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

        <EmployeeForm toggleDialog={toggleIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
