export type Post = {
	title: string;
	category: string;
	thumbnail: string;
	date: Date;
	content: string;
};

export type PostData = Post & {
	url: string;
	dateString: string;
	readingMinutes: number;
};

export type Category = {
	category: string;
	count: number;
};

export type HeadingItem = {
	text: string;
	link: string;
	indent: number;
};
