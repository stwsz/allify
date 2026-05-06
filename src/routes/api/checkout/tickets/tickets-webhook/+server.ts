// Svelte
import type { RequestHandler } from '@sveltejs/kit';

// Environment variables
import { ABACATEPAY_WEBHOOK_SECRET } from '$env/static/private';

export const POST: RequestHandler = async ({ request, url }) => {
	const webhookSecret = url.searchParams.get('webhookSecret');

	if (webhookSecret !== ABACATEPAY_WEBHOOK_SECRET) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401
		});
	}

	const rawBody = await request.text();

	let body;
	try {
		body = JSON.parse(rawBody);
	} catch {
		return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
			status: 400
		});
	}

	const email = body?.data?.customer?.email;
	const tickets = body?.data?.checkout.items[0]?.quantity;

	if (!email) {
		return new Response(JSON.stringify({ error: 'Missing email' }), {
			status: 400
		});
	}

	await fetch(`${url.origin}/api/mongodb/add-ticket`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			email,
			tickets
		})
	});

	return new Response(JSON.stringify({ success: true }), {
		status: 200
	});
};