import { Metadata } from "next";

import { getCategoryList } from "@/service/posts";
import PostGrid from "@/components/post_list/PostGrid";

type Props = {
	params: Promise<{ category: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
	const categoryList = await getCategoryList();
	return categoryList.map(({ category }) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { category } = await params;
	const title = category;
	return { title };
}

export default async function CategoryPage({ params }: Props) {
	const { category } = await params;
	return <PostGrid category={category} />;
}
