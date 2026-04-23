// Svelte
import type { RequestHandler } from '@sveltejs/kit';

// Server
import { connectDB } from '$lib/server/mongodb';

// Environment variables
import { MONGO_DB } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
	const { tickets, email } = await request.json();

	if (!tickets) {
		return new Response(JSON.stringify({ error: true, message: 'Missing required fields' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	if (tickets === 0) {
		return new Response(JSON.stringify({ error: true, message: 'No tickets available' }), {
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
					tickets: tickets - 1
				}
			}
		);

		return new Response(
			JSON.stringify({
				success: true,
				tickets: tickets - 1
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	} catch (error) {
		return new Response(JSON.stringify({ error: true, message: 'Internal server error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
