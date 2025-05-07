import { getSortedPostList } from '@/service/posts';

export const revalidate = 60;

export async function GET() {
  const posts = await getSortedPostList();
  return new Response(JSON.stringify(posts), {
    headers: { 'Content-Type': 'application/json' },
  });
}
