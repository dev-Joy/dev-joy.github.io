import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { ThemeProvider } from "@/components/libraries/theme-provider";
import { GoogleAdSense } from "@/components/libraries/GoogleAdSense";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

const OpenSans = Open_Sans({
	variable: "--font-open-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: "김주희 블로그",
		template: "%s | 김주희 블로그",
	},
	description: "김주희 개발 블로그",
	keywords: "%s",
	icons: {
		icon: `${process.env.BASE_PATH}/favicon.ico`,
	},
	openGraph: {
		title: "김주희 블로그",
		description: "김주희 개발 블로그",
		siteName: "김주희 블로그",
		images: "/images/og-img.png",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "김주희 블로그",
		description: "김주희 개발 블로그",
		images: "/images/og-img.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='ko'
			className={`${OpenSans.variable} h-full scroll-my-20 scroll-smooth`}
			suppressHydrationWarning
		>
			<body className='flex min-h-screen flex-col'>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<Header />
					<main className='mt-[64px] flex flex-1 flex-col'>{children}</main>
					<Footer />
				</ThemeProvider>
			</body>
			<GoogleAnalytics gaId='272861819' />
			<GoogleTagManager gtmId='GTM-KDK7H4QN' />
			<GoogleAdSense />
		</html>
	);
}
