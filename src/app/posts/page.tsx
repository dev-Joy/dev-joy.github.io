import PostGrid from "@/components/post_list/PostGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "All Posts",
	description: "공유하고 싶은 기술이나 에러 해결방법을 정리합니다.",
};

export default async function PostsPage() {
	return <PostGrid />;
}
