// Svelte
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

// Stores
import { showAddTickets } from '$lib/stores/showAddTickets.store';

// Environment variables
import { ABACATEPAY_TOKEN, ALLIFY_URL } from '$env/static/private';

const ALLOWED_ORIGINS = [ALLIFY_URL];

export const POST: RequestHandler = async ({ request }) => {
	const origin = request.headers.get('origin');

	if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
		return new Response(JSON.stringify({ error: 'Forbidden' }), {
			status: 403,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const body = await request.json();

	const req = await fetch('https://api.abacatepay.com/v2/checkouts/create', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${ABACATEPAY_TOKEN}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});

	const data = await req.json();

	if (!req.ok) {
		return json({ error: data?.error ?? 'AbacatePay error' }, { status: req.status });
	}

	showAddTickets.set(false);

	return json(data);
};
