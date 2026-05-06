// Svelte
import type { RequestHandler } from '@sveltejs/kit';

// Server
import { connectDB } from '$lib/server/mongodb';

// Environment variables
import { MONGO_DB } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
	const { email, tickets } = await request.json();

	if (!tickets || !email) {
		return new Response(JSON.stringify({ error: true }), { status: 400 });
	}

    console.log(`Adding ${tickets} tickets for ${email}`);

	try {
		const client = await connectDB();
		const db = client.db(MONGO_DB);
		const users = db.collection('users');

		await users.updateOne(
			{ email },
			{
				$inc: { tickets }
			}
		);

		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch {
		return new Response(JSON.stringify({ error: true }), { status: 500 });
	}
};