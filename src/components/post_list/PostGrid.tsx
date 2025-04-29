import {
	getAllPostCount,
	getCategoryList,
	getSortedPostList,
} from "@/service/posts";
import PostCard from "./PostCard";
import CategoryList from "./CategoryList";

type PostListProps = {
	category?: string;
};

export default async function PostGrid({ category }: PostListProps) {
	const postList = await getSortedPostList(category);
	const categoryList = await getCategoryList();
	const allPostCount = await getAllPostCount();

	return (
		<section className='mx-auto mt-12 w-full max-w-[950px] px-4'>
			<h1 className='text-4xl font-bold mb-3 text-blue-900 dark:text-blue-300'>
				{category ?? "All"}
			</h1>
			<CategoryList
				allPostCount={allPostCount}
				categoryList={categoryList}
				selectedCategory={category}
			/>
			<section>
				<ul className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12'>
					{postList.map((post) => (
						<PostCard key={post.url + post.date} post={post} />
					))}
				</ul>
			</section>
		</section>
	);
}
