import { InputHTMLAttributes, useId } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';

type TInputFieldProps = {
  label?: string;
  required?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export default function InputField({
  label,
  required = false,
  ...props
}: TInputFieldProps) {
  const id = useId();

  return (
    <div className='mb-3'>
      {label && (
        <Label className={`${required ? 'required-label' : ''}`} htmlFor={id}>
          {label}
        </Label>
      )}
      <Input id={id} required={required} {...props} />
    </div>
  );
}
