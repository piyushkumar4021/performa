import Image from 'next/image';
import logo from '/public/icon.svg';
import { cn } from '@/lib/utils';

export default function Logo({ className }) {
  return (
    <Image
      className={cn('w-[28px] drop-shadow-lg', className)}
      src={logo}
      alt='Logo'
    />
  );
}
