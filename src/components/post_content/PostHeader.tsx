import { PostData } from "@/service/types";
import Link from "next/link";
import { CalendarDaysIcon } from "../../app/icon/calendar-days";
import { ClockIcon } from "../../app/icon/clock";

export default function PostHeader({ post }: { post: PostData }) {
	const { title, category, dateString, readingMinutes } = post;
	return (
		<section className='mt-14 text-center'>
			<h1 className='mb-5 text-3xl'>{title}</h1>
			<div className='mb-3 text-base'>
				<Link
					href={`/posts/${category}`}
					className='font-semibold text-blue-600 no-underline underline-offset-4 hover:underline dark:text-blue-300'
				>
					{category}
				</Link>
			</div>
			<div className='flex justify-center text-sm text-gray-500 dark:text-gray-400'>
				<div className='flex items-center'>
					<CalendarDaysIcon size={20} />
					<span>{dateString}</span>
					<ClockIcon size={20} />
					<span>{readingMinutes}분</span>
				</div>
			</div>
			<hr className='mt-5' />
		</section>
	);
}
