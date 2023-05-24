export default {
	async fetch(
		/** @type {import("miniflare").Request} */ request,
		/** @type {import("./app").Env}*/ env
	) {
		const key = new URL(request.url).searchParams.get('key');

		if (!key) return new Response('Missing "key" URL search param', { status: 400 });

		if (request.method === 'GET') {
			return new Response(await env.KV.get(key));
		}

		if (request.method === 'PUT') {
			const value = await request.text();
			await env.KV.put(key, value);
			return new Response();
		}
	}
};
