import { getSortedPostList } from '@/service/posts';

export async function GET() {
  const posts = await getSortedPostList();
  return new Response(JSON.stringify(posts));
}
