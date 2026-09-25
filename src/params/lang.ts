import type { ParamMatcher } from '@sveltejs/kit';

/** Only Spanish has a prefix; English is served at the root */
export const match: ParamMatcher = (param) => param === 'es';
