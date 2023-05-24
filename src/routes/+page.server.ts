import type { PageServerLoad } from './$types';

export const load = (async ({ platform }) => {
	await platform?.env?.TEST_NAMESPACE1.put('username', 'dog');

	const username = await platform?.env?.TEST_NAMESPACE1.get('username');
	
	return {
		username
	};
}) satisfies PageServerLoad;
