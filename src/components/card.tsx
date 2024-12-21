import { ReactNode } from 'react';

export default function Card({ children }: { children: ReactNode }) {
  return (
    <section className='bg-[#e9ecef] overflow-hidden text-[#212529] w-full h-full rounded-md shadow hover:shadow-md transition duration-500'>
      {children}
    </section>
  );
}
