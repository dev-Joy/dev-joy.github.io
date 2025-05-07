import { CalendarDaysIcon } from '@/app/icon/calendar-days';
import { ClockIcon } from '@/app/icon/clock';
import { PostData } from '@/service/types';
import Image from 'next/image';
import Link from 'next/link';

export default function PostSummaryList({
  postList,
}: {
  postList: PostData[];
}) {
  return (
    <article>
      <ul className='flex flex-col items-center'>
        {postList.map((post) => (
          <li
            key={post.url + post.title}
            className='cursor-pointer transition-all duration-500 w-full max-w-3xl'
          >
            <Link href={post.url}>
              <section className='group grid grid-cols-[2fr_1fr] m-4 p-2 items-center justify-items-start gap-4'>
                <div>
                  <h1 className='text-2xl font-bold transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-300'>
                    {post.title}
                  </h1>
                  <div className='text-sm font-medium text-blue-600 lg:text-base dark:text-blue-300'>
                    {post.category}
                  </div>
                  <div className='flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400'>
                    <CalendarDaysIcon size={20} />
                    <span>{post.dateString}</span>
                    <ClockIcon size={20} />
                    <span>{post.readingMinutes}분</span>
                  </div>
                </div>
                <Image
                  src={post.thumbnail}
                  alt={`thumbnail for ${post.title}`}
                  width={150}
                  height={120}
                  className='transition-transform duration-300 group-hover:scale-110 object-cover rounded-md'
                />
              </section>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
