import { Miniflare } from 'miniflare';

async function KVNamespace(mf: Miniflare, namespace: string) {
	const base_url = new URL(await mf.ready);
	base_url.searchParams.set('namespace', namespace);

	return {
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
	} as KVNamespace;
}

export async function get_dev_platform() {
	const kvNamespaces = ['TEST_NAMESPACE1'];

	const mf = new Miniflare({
		kvNamespaces,
		kvPersist: true,
		modules: true,
		scriptPath: 'src/worker.js'
	});

	const env: Record<string, KVNamespace> = {};
	for (const kvNamespace of kvNamespaces) {
		env[kvNamespace] = await KVNamespace(mf, kvNamespace);
	}

	return {
		env
	} as App.Platform;
}
