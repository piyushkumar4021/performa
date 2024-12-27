'use client';

import Link from 'next/link';
import Logo from './logo';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const routes = [
  {
    name: 'Dashboard',
    path: '/app/dashboard',
  },
  {
    name: 'Account',
    path: '/app/account',
  },
];

export default function Header() {
  return (
    <header className='flex justify-between items-center pb-3 border-b-2 border-b-white/20'>
      <Logo priority />

      <NavLinks />
    </header>
  );
}

const NavLinks = () => {
  const currPath = usePathname();
  const getClassName = (path: string) =>
    cn('px-3 py-1 sm:px-4 sm:py-2 rounded-md transition duration-300', {
      'bg-white/25': path === currPath,
    });

  return (
    <nav>
      <ul className={'flex sm:gap-x-3'}>
        {routes.map((route) => (
          <li key={route.name} className={getClassName(route.path)}>
            <Link href={route.path}>{route.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
