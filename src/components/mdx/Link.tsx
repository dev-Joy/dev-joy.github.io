import { PropsWithChildren } from "react";

import { LinkProps } from "next/link";

export const ExternalLink = ({
	children,
	href,
	...props
}: PropsWithChildren<LinkProps>) => {
	return (
		<a
			{...props}
			target='_blank'
			rel='noreferrer'
			href={href.toString() || ""}
			className='break-words text-blue-600 no-underline underline-offset-4 hover:underline dark:text-blue-300'
		>
			{children}
		</a>
	);
};
