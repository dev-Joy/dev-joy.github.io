import PostListPage from '@/components/post_pagination/PostListPage';
import { Suspense } from 'react';

export default function HomePage() {
  return (
    <section className='w-full'>
      <Suspense>
        <PostListPage />
      </Suspense>
    </section>
  );
}
