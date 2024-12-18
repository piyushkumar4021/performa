export default function SearchForm() {
  return (
    <form className='w-full h-full'>
      <input
        className='w-full bg-white/50 rounded-md px-4 py-2 text-black/80 placeholder:text-black/40 outline-none hover:bg-white/70 focus:bg-white/70 transition focus:ring-4 ring-white/35'
        type='text'
        placeholder='Search employees'
      />
    </form>
  );
}
