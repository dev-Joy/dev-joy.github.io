"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "../ui/button";
import { HomeIcon } from "../../app/icon/home";
import { SunIcon } from "../../app/icon/sun";
import { MoonIcon } from "../../app/icon/moon";
import { usePathname } from "next/navigation";

export default function Header() {
	const pathname = usePathname();

	return (
		<header className='fixed z-40 flex w-full flex-col items-center justify-center border-b bg-background shadow-sm print:hidden'>
			<nav className='mt-1 flex h-[64px] w-full max-w-[1200px] items-center justify-between px-4'>
				<Link
					href='/posts'
					className={`${pathname === "/posts" ? "underline" : ""}`}
				>
					<span className='font-bold hover:text-blue-600'>POSTS</span>
				</Link>
				<div className='flex items-center'>
					<Button type='button' variant='ghost' size='icon'>
						<Link href='/'>
							<HomeIcon />
						</Link>
					</Button>
					<ThemeChanger />
				</div>
			</nav>
		</header>
	);
}

function ThemeChanger() {
	const { setTheme, theme } = useTheme();

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	return (
		<Button type='button' variant='ghost' size='icon' onClick={toggleTheme}>
			<SunIcon className='transition-all dark:hidden text-primary stroke-1' />
			<MoonIcon className='hidden transition-all dark:block text-primary stroke-1' />
			<span className='sr-only'>Toggle theme</span>
		</Button>
	);
}
