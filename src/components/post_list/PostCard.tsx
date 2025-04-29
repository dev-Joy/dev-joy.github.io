import { PostData } from "@/service/types";
import Image from "next/image";
import Link from "next/link";
import { CalendarDaysIcon } from "../../app/icon/calendar-days";
import { ClockIcon } from "../../app/icon/clock";

type Props = { post: PostData };

export default function PostCard({
	post: { title, dateString, category, url, thumbnail, readingMinutes },
}: Props) {
	return (
		<Link href={url}>
			<li
				key={title}
				className='flex h-full flex-col gap-3 overflow-hidden rounded-md border shadow-md transition hover:shadow-xl dark:border-slate-700 dark:hover:border-white'
			>
				<div className='relative aspect-video w-full rounded-t-md border-b'>
					<Image
						src={thumbnail}
						alt={`thumbnail for ${title}`}
						fill
						priority
						className='object-cover'
					/>
				</div>
				<div className='flex flex-1 flex-col justify-between p-4 pt-1'>
					<div>
						<div className='text-sm font-medium text-blue-600 lg:text-base dark:text-blue-300'>
							{category}
						</div>
						<h2 className='mb-3 mt-1 text-lg font-bold sm:text-xl md:text-lg'>
							{title}
						</h2>
					</div>
					<div className='flex justify-between gap-3 text-sm text-gray-500 dark:text-gray-400'>
						<div className='flex items-center gap-1'>
							<CalendarDaysIcon size={20} />
							<span>{dateString}</span>
						</div>
						<div className='flex items-center gap-1'>
							<ClockIcon size={20} />
							<span>{readingMinutes}분</span>
						</div>
					</div>
				</div>
			</li>
		</Link>
	);
}
