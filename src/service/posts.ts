import fs from "fs";
import path from "path";

import { sync } from "glob";
import dayjs from "dayjs";
import matter from "gray-matter";
import readingTime from "reading-time";

import { Category, HeadingItem, Post, PostData } from "./types";

const BASE_PATH = "data/posts";
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

export const getPostPaths = (category?: string) => {
	const folder = category || "**";
	const postPaths: string[] = sync(`${POSTS_PATH}/${folder}/**/*.mdx`);
	return postPaths;
};

export const parsePost = async (postPath: string): Promise<PostData> => {
	const decodedPostPath = decodeURIComponent(postPath);
	const postAbstract = parsePostAbstract(decodedPostPath);
	const postDetail = await parsePostDetail(decodedPostPath);
	return {
		...postAbstract,
		...postDetail,
	};
};

export const parsePostAbstract = (postPath: string) => {
	const normalizedPath = postPath.split(path.sep).join("/");
	const filePath = normalizedPath
		.slice(normalizedPath.indexOf(BASE_PATH))
		.replace(`${BASE_PATH}/`, "")
		.replace(".mdx", "");

	const [category, slug] = filePath.split("/");

	const url = `/posts/${category}/${slug}`;
	return { url, category, slug };
};

const parsePostDetail = async (postPath: string) => {
	const file = fs.readFileSync(postPath, "utf8");
	const { data, content } = matter(file);
	const grayMatter = data as Post;
	const readingMinutes = Math.ceil(readingTime(content).minutes);
	const dateString = dayjs(grayMatter.date)
		.locale("ko")
		.format("YYYY년 MM월 DD일");
	return { ...grayMatter, dateString, content, readingMinutes };
};

const sortPostList = (PostList: PostData[]) => {
	return PostList.sort((a, b) => (a.date > b.date ? -1 : 1));
};

export const getPostList = async (category?: string): Promise<PostData[]> => {
	const postPaths = getPostPaths(category);
	const postList = await Promise.all(
		postPaths.map((postPath) => parsePost(postPath)),
	);
	return postList;
};

export const getSortedPostList = async (
	category?: string,
): Promise<PostData[]> => {
	const postList = await getPostList(category);
	return sortPostList(postList);
};

export const getSitemapPostList = async () => {
	const postList = await getPostList();
	const baseUrl = "https://dev-joy.github.io";
	const sitemapPostList = postList.map(({ url }) => ({
		lastModified: new Date(),
		url: `${baseUrl}${url}`,
	}));
	return sitemapPostList;
};

export const getAllPostCount = async () => (await getPostList()).length;

export const getCategoryList = async (): Promise<Category[]> => {
	const postList = await getPostList();
	const result: { [key: string]: number } = {};
	for (const post of postList) {
		const category = post.category;
		if (result[category]) {
			result[category] += 1;
		} else {
			result[category] = 1;
		}
	}
	const detailList: Category[] = Object.entries(result).map(
		([category, count]) => ({
			category,
			count,
		}),
	);

	return detailList;
};

export const getPostDetail = async (
	category: string,
	title: string,
): Promise<PostData> => {
	const filePath = path.join(POSTS_PATH, category, `${title}.mdx`);
	const detail = await parsePost(filePath);
	return { ...detail };
};

export const parseToc = (content: string): HeadingItem[] => {
	const regex = /^(##|###) (.*$)/gim;
	const headingList = content.match(regex);
	return (
		headingList?.map((heading: string) => ({
			text: heading.replace("##", "").replace("#", ""),
			link:
				"#" +
				heading
					.replace("# ", "")
					.replace("#", "")
					.replace(/[\[\]:!@#$/%^&*()+=,.]/g, "")
					.replace(/ /g, "-")
					.toLowerCase()
					.replace("?", ""),
			indent: (heading.match(/#/g)?.length || 2) - 2,
		})) || []
	);
};
