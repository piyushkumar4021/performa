import Image from 'next/image';
import logo from '/public/icon.svg';
import { cn } from '@/lib/utils';

type TLogoProps = Partial<
  {
    className: string;
  } & React.ComponentProps<typeof Image>
>;

export default function Logo({ className, ...props }: TLogoProps) {
  return (
    <Image
      className={cn('w-[28px] drop-shadow-lg', className)}
      {...props}
      src={logo}
      alt='Logo'
    />
  );
}
