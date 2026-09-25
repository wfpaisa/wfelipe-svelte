export interface ReaderLink {
	link: string;
	target: string;
	aria: string;
	icon: string;
}

/** A project as the reader shows it: one full-page screenshot plus its light strip. */
export interface ReaderItem {
	name: string;
	tags: string[];
	/** Full-resolution, full-page screenshot */
	full: { src: string; width: number; height: number };
	/** Same screenshot at 600px wide, used by cards and the minimap */
	strip: string;
	youtubeId?: string;
	description?: string;
	links?: ReaderLink[];
}

export type ReaderTab = 'site' | 'video';

export interface OpenOptions {
	tab?: ReaderTab;
	/** 0..1, where the card was showing the site; the reader opens at the same place */
	progress?: number;
	/** Element that morphs into the reader (view transition) and gets focus back on close */
	origin?: HTMLElement | null;
}

type OpenHandler = (items: ReaderItem[], index: number, options: OpenOptions) => void;

let handler: OpenHandler | null = null;

/** Called once by <ProjectReader /> so cards can open it without prop drilling. */
export function registerReader(fn: OpenHandler | null) {
	handler = fn;
}

export function openReader(items: ReaderItem[], index: number, options: OpenOptions = {}) {
	handler?.(items, index, options);
}
