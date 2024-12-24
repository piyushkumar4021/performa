import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Button } from './ui/button';

type TEmployeeRemoveButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function EmployeeRemoveButton({
  children,
  ...props
}: TEmployeeRemoveButtonProps) {
  return (
    <Button variant='destructive' {...props}>
      {children}
    </Button>
  );
}
