import { cn } from "@/lib/utils";
import { HeadingItem } from "@/service/types";
import Link from "next/link";

interface Props {
	toc: HeadingItem[];
}

export default function TableOfContentTop({ toc }: Props) {
	return (
		<nav className='xl:hidden'>
			<h3 id='table-of-contents-top'>On this Page</h3>
			<ul>
				{toc.map((item) => (
					<li
						key={item.link}
						className={cn(item.indent === 1 && "ml-4", "my-0 py-1 ")}
					>
						<Link
							href={item.link}
							className='underline-offset-4 hover:text-blue-600 dark:text-blue-300'
						>
							{item.text}
						</Link>
					</li>
				))}
			</ul>
			<hr />
		</nav>
	);
}
