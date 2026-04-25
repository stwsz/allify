// Svelte
import { json } from '@sveltejs/kit';
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

	try {
		const { user } = await request.json();

		const client = await connectDB();
		const db = client.db(MONGO_DB);
		const users = db.collection('users');

		const existingUser = await users.findOne({ email: user.email });

		if (existingUser) {
			return json({ error: 'User already exists' }, { status: 409 });
		}

		const result = await users.insertOne({
			...user,
			createdAt: new Date().toLocaleDateString('en-US')
		});

		return json({
			success: true,
			createdUser: {
				...user,
				_id: result.insertedId
			}
		});
	} catch (err) {
		return json({ error: err instanceof Error ? err.message : 'Internal error' }, { status: 500 });
	}
};
