import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

// Server
import { connectDB } from '$lib/server/mongodb';

// Environment variables
import { MONGO_DB } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
	try {
		console.log('➡️ [START] Incoming request to /get-user');

		const body = await request.json();
		console.log('[BODY RECEIVED]:', body);

		const { email } = body;

		if (!email) {
			console.log('[VALIDATION ERROR] Email is missing');
			return json({ error: 'Email is required' }, { status: 400 });
		}

		console.log('[DB] Connecting to MongoDB...');
		const client = await connectDB();
		console.log('[DB] Connected successfully');

		const db = client.db(MONGO_DB);
		console.log('[DB] Using database:', MONGO_DB);

		const users = db.collection('users');
		console.log('[COLLECTION] users collection ready');

		console.log(`[QUERY] Searching for user with email: ${email}`);
		const user = await users.findOne({ email });

		if (!user) {
			console.log('[NOT FOUND] No user found with this email');
			return json({ error: 'User not found' }, { status: 404 });
		}

		console.log('[SUCCESS] User found');

		return json({
			success: true,
			userInfoFromMongoDB: user
		});
	} catch (err) {
		console.error('[ERROR] Unexpected error:', err);

		return json(
			{
				error: err instanceof Error ? err.message : 'Internal error'
			},
			{ status: 500 }
		);
	}
};

