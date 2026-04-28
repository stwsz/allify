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

	const { email, artistsLimit } = await request.json();

	if (!email || !artistsLimit) {
		return new Response(JSON.stringify({ error: true, errorMessage: 'Missing required fields' }), {
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
					'connectedStreamings.spotify.mostListenedArtists.limit': artistsLimit + 5,
					'connectedStreamings.spotify.mostListenedArtists.updatedAt':
						new Date().toLocaleDateString('en-US')
				}
			}
		);

		return new Response(JSON.stringify({ success: true, newLimit: artistsLimit + 5 }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch {
		return new Response(JSON.stringify({ error: true, errorMessage: 'Internal server error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
