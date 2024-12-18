import { ReactNode } from 'react';

export default function Card({ children }: { children: ReactNode }) {
  return (
    <section className='bg-[#f1f3f5] text-[#212529] w-full h-full rounded-md shadow hover:shadow-md transition duration-500'>
      {children}
    </section>
  );
}
