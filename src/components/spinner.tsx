export default function Spinner() {
  return (
    <div role='status'>
      <div className='w-4 h-4 border-2 border-transparent border-t-white border-l-white animate-spin rounded-full' />
      <span className='sr-only'>Loading...</span>
    </div>
  );
}
