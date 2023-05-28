import { dev } from '$app/environment';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	if (dev) {
		const { get_dev_platform } = await import('./miniflare');
		event.platform = await get_dev_platform();
	}

	const response = await resolve(event);
	return response;
}) satisfies Handle;
