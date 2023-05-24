export default {
	async fetch(
		/** @type {import("miniflare").Request} */ request,
		/** @type {Record<string,KVNamespace>}*/ env
	) {
		const namespace = new URL(request.url).searchParams.get('namespace');
		if (!namespace) return new Response('Missing "namespace" URL search param', { status: 400 });

		const key = new URL(request.url).searchParams.get('key');

		if (!key) return new Response('Missing "key" URL search param', { status: 400 });

		if (request.method === 'GET') {
			return new Response(await env[namespace].get(key));
		}

		if (request.method === 'PUT') {
			const value = await request.text();
			await env[namespace].put(key, value);
			return new Response();
		}
	}
};
