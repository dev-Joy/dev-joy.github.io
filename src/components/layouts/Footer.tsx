import Link from "next/link";
import { GithubIcon } from "../../app/icon/github";

export default function Footer() {
	return (
		<footer className='flex flex-col items-center my-2'>
			<p className='py-2 text-sm text-center'>
				© 2025. dev-Joy all rights reserved.
			</p>
			<Link
				href='https://github.com/dev-Joy/dev-joy.github.io'
				target='_blank'
				rel='noreferrer'
			>
				<GithubIcon />
			</Link>
		</footer>
	);
}
