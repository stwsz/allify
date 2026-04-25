// Svelte
import type { RequestHandler } from '@sveltejs/kit';

// Server
import { connectDB } from '$lib/server/mongodb';

// Environment variables
import { MONGO_DB, ALLIFY_URL } from '$env/static/private';

const ALLOWED_ORIGINS = [ALLIFY_URL];

export const POST: RequestHandler = async ({ request }) => {
	const origin = request.headers.get('origin');

	if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
		return new Response(JSON.stringify({ error: 'Forbidden' }), {
			status: 403,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const { email, tracks, artists } = await request.json();

	if (!email || !tracks || !artists) {
		return new Response(JSON.stringify({ success: false, message: 'Missing required fields' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	try {
		const client = await connectDB();

		const db = client.db(MONGO_DB);
		const users = db.collection('users');
		await users.updateOne(
			{ email },
			{
				$set: {
					discoveries: { tracks, artists, updatedAt: new Date().toLocaleDateString('en-US') }
				}
			}
		);

		return new Response(
			JSON.stringify({
				success: true,
				discoveries: { tracks, artists, updatedAt: new Date().toLocaleDateString('en-US') }
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	} catch (error) {
		return new Response(JSON.stringify({ success: false }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
