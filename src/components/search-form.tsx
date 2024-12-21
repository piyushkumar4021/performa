'use client';

import { useSearchContext } from '@/app/contexts/search-context-provider';

export default function SearchForm() {
  const { query, handleChangeQuery } = useSearchContext();

  return (
    <form className='w-full h-full'>
      <input
        className='w-full bg-white/50 rounded-md px-4 py-2 text-black/80 placeholder:text-black/40 outline-none hover:bg-white/70 focus:bg-white/70 transition focus:ring-4 ring-white/35'
        type='search'
        placeholder='Search employees'
        value={query}
        onChange={({ target }) => handleChangeQuery(target.value.toLowerCase())}
      />
    </form>
  );
}
