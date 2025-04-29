import Image from "next/image";

interface ImageProps {
	src: string;
	alt: string;
}

export const ImageComponent = ({ src, alt }: ImageProps) => {
	return (
		<>
			<Image
				src={src}
				alt={alt || "Image"}
				className='mx-auto mb-0 mt-8 rounded-md'
				width={500}
				height={300}
			/>
			{alt && (
				<span className='mb-8 mt-2 block w-full text-center text-sm text-gray-500 dark:text-gray-400'>
					{alt}
				</span>
			)}
		</>
	);
};
