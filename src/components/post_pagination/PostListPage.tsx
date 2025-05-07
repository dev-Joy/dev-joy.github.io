'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PostSummaryList from './PostSummaryList';
import PostPagination from './PostPagination';
import Loading from './Loading';
import { PostData } from '@/service/types';

export default function PostListPage() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page') ?? '1');
  const postsPerPage = 5;

  const [posts, setPosts] = useState(Array<PostData>);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/posts')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }
        return res.json();
      })
      .then((allPosts) => {
        const paginatedPosts = allPosts.slice(
          (currentPage - 1) * postsPerPage,
          currentPage * postsPerPage
        );
        setPosts(paginatedPosts);
        setTotalPages(Math.ceil(allPosts.length / postsPerPage));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
        setIsLoading(false);
      });
  }, [currentPage]);

  return (
    <>
      {isLoading ? (
        <Loading postsPerPage={postsPerPage} />
      ) : (
        <PostSummaryList postList={posts} />
      )}
      <PostPagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
