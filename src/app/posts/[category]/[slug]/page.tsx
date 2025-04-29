import Giscus from "@/components/post_content/Giscus";
import PostBody from "@/components/post_content/PostBody";
import PostHeader from "@/components/post_content/PostHeader";
import TableOfContentSidebar from "@/components/post_content/TableOfContentSidebar";
import TableOfContentTop from "@/components/post_content/TableOfContentTop";
import {
	getPostDetail,
	getPostPaths,
	parsePostAbstract,
	parseToc,
} from "@/service/posts";
import { Metadata } from "next";

type PageParams = Promise<{ category: string; slug: string }>;

export const dynamicParams = false;

export async function generateMetadata({
	params,
}: {
	params: PageParams;
}): Promise<Metadata> {
	const { category, slug } = await params;
	const { title } = await getPostDetail(category, slug);
	return { title };
}

export function generateStaticParams() {
	const postPaths: string[] = getPostPaths();
	const paramList = postPaths
		.map((path) => parsePostAbstract(path))
		.map((item) => ({ category: item.category, slug: item.slug }));
	return paramList;
}

export default async function PostDetailPage({
	params,
}: {
	params: PageParams;
}) {
	const { category, slug } = await params;
	const post = await getPostDetail(category, slug);
	const toc = parseToc(post.content);
	return (
		<article className='prose mx-auto w-full max-w-[750px] px-5 dark:prose-invert sm:px-6'>
			<PostHeader post={post} />
			<TableOfContentTop toc={toc} />
			<article className='relative'>
				<TableOfContentSidebar toc={toc} />
				<PostBody content={post.content} />
			</article>
			<hr />
			<Giscus />
		</article>
	);
}
