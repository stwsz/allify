// Svelte
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

// Server
import { connectDB } from '$lib/server/mongodb';

// Environment variables
import { MONGO_DB } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
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
			createdAt: new Date()
		});

		await client.close();

		return json({
			success: true,
			createdUser: user,
			userId: result.insertedId
		});
	} catch (err) {
		return json({ error: err instanceof Error ? err.message : 'Internal error' }, { status: 500 });
	}
};
