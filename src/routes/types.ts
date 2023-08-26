export interface IPortfolioItem {
	name: string;
	tags: string[];
	dialog?: string;
	youtubeId?: string;
	preview?: string;
	image: {
		preview: string;
		big: string;
		bigWidth: string;
		bigHeight: string;
	};
}

export interface ILinks {
	link: string;
	target: string;
	aria: string;
	icon: string;
}

export interface IProject {
	name: string;
	description: string;
	tags: string[];
	position: 'dir-lf' | 'dir-rl';
	images: {
		small: {
			src: string;
			alt: string;
			width: string;
			height: string;
		};
		fullscreen: {
			src: string;
			alt: string;
			width: string;
			height: string;
		};
	};
	links: ILinks[];
}
