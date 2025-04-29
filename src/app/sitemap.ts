import { getSitemapPostList } from '@/service/posts';
import { MetadataRoute } from 'next';
export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postList = await getSitemapPostList();
  const baseUrl = 'https://dev-joy.github.io';
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...postList,
  ];
}
