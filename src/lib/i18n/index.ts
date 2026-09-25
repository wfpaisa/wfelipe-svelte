import { getContext, setContext } from 'svelte';
import { en, es, type Messages } from './messages';

export type Locale = 'en' | 'es';

export const locales: Locale[] = ['en', 'es'];

/** localStorage key for the visitor's explicit choice (also read by the inline script in app.html) */
export const LANG_STORAGE_KEY = 'lang';

export const messages: Record<Locale, Messages> = { en, es };

/** English lives at "/", Spanish at "/es" */
export const localePath = (locale: Locale) => (locale === 'es' ? '/es' : '/');

export const toLocale = (value: string | undefined): Locale => (value === 'es' ? 'es' : 'en');

export interface I18n {
	readonly locale: Locale;
	readonly t: Messages;
}

const key = Symbol('i18n');

export function setI18n(i18n: I18n) {
	setContext(key, i18n);
}

export function getI18n(): I18n {
	return getContext(key);
}
