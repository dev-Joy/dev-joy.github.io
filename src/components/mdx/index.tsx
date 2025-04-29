import { JSX } from "react";
import { Callout } from "./Callout";
import { ImageComponent } from "./ImageComponent";
import { ExternalLink } from "./Link";
import { MDXComponents } from "mdx/types";

export const MdxComponents: MDXComponents = {
	a: ExternalLink as React.ComponentType<JSX.IntrinsicElements["a"]>,
	img: ImageComponent as React.ComponentType<JSX.IntrinsicElements["img"]>,
	blockquote: Callout,
	Callout,
};
