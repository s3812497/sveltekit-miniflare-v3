import { dev } from '$app/environment';
import type { Handle } from '@sveltejs/kit';
import { get_dev_platform } from './miniflare';

export const handle = (async ({ event, resolve }) => {
	if (dev) {
		event.platform = await get_dev_platform();
	}

	const response = await resolve(event);
	return response;
}) satisfies Handle;
