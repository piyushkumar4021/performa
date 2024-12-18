import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='bg-gradient-to-br from-[#5c940d] to-[#acd968]'>
      <div className='max-w-6xl min-h-screen mx-auto flex flex-col md:flex-row items-center gap-x-8 gap-y-5 pt-10 px-3 pb-10'>
        <div className='rounded-lg w-full max-w-[450px] aspect-video bg-white shadow' />

        <div>
          <p className='mt-3 text-3xl md:text-4xl max-w-[450px]'>
            Empowering <span className='text-[#3e6606] font-bold'>People</span>,
            Elevating{' '}
            <span className='text-[#3e6606] font-bold'>Performance</span>
          </p>

          <p className='text-base mt-2'>
            Performa is a smart solution for managing employee data and HR
            processes, helping businesses stay organized, efficient, and focused
            on growth.
          </p>

          <ButtonGroup />
        </div>
      </div>
    </main>
  );
}

const ButtonGroup = () => {
  return (
    <div className='space-x-4 mt-6'>
      <Button asChild>
        <Link href='/login'>Get Started</Link>
      </Button>
      <Button asChild variant='secondary'>
        <Link href='/signup'>Log in</Link>
      </Button>
    </div>
  );
};
