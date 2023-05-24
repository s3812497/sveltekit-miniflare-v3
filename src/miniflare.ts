import { Miniflare } from 'miniflare';

export async function get_dev_platform() {
	const mf = new Miniflare({
		kvNamespaces: ['KV'],
		kvPersist: true,
		modules: true,
		scriptPath: 'src/worker.js'
	});

	const base_url = await mf.ready;

	const KV = {
		get: async (key: string) => {
			const url = new URL(base_url);
			url.searchParams.set('key', key);
			const res = await mf.dispatchFetch(url);
			return await res.text();
		},
		put: async (key: string, value: string): Promise<void> => {
			const url = new URL(base_url);
			url.searchParams.set('key', key);
			await mf.dispatchFetch(url, { method: 'PUT', body: value });
			return;
		}
	};

	return {
		env: {
			KV
		}
	} as App.Platform;
}
