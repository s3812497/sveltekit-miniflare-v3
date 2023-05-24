import type { PageServerLoad } from './$types';

export const load = (async ({ platform }) => {
	await platform?.env?.KV.put('username', 'dog');

	const username = await platform?.env?.KV.get('username');
	
	return {
		username
	};
}) satisfies PageServerLoad;
