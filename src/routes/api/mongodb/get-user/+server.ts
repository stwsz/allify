// Svelte
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

// Server
import { connectDB } from '$lib/server/mongodb';

// Environment variables
import { MONGO_DB } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();

		const { email } = body;

		if (!email) {
			return json({ error: 'Email is required' }, { status: 400 });
		}

		const client = await connectDB();

		const db = client.db(MONGO_DB);
		const users = db.collection('users');
		const user = await users.findOne({ email });

		if (!user) {
			return json({ success: false, error: 'User not found' }, { status: 200 });
		}

		return json({
			success: true,
			userInfoFromMongoDB: user
		});
	} catch (err) {
		return json(
			{
				error: err instanceof Error ? err.message : 'Internal error'
			},
			{ status: 500 }
		);
	}
};
