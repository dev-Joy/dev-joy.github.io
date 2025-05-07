import { Skeleton } from '../ui/skeleton';

export default function Loading({ postsPerPage }: { postsPerPage: number }) {
  return (
    <ul className='flex flex-col items-center w-full'>
      {Array.from({ length: postsPerPage }).map((_, i) => (
        <li key={i} className='w-full max-w-3xl'>
          <section className='grid grid-cols-[2fr_1fr] m-4 p-2 items-center justify-items-start gap-4'>
            <div className='space-y-2 w-full'>
              <Skeleton className='h-6 w-3/4' />
              <Skeleton className='h-4 w-24' />
              <div className='flex gap-2'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-4 w-16' />
              </div>
            </div>
            <Skeleton className='h-[120px] w-[150px] rounded-md' />
          </section>
        </li>
      ))}
    </ul>
  );
}
