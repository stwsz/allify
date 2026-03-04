import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies, request }) => {
	const token = cookies.get('spotify_access_token');
	const { userId } = await request.json();

	if (!token) {
		return new Response(JSON.stringify({ error: 'No Spotify access token found' }), {
			status: 401
		});
	}

	try {
		const response = await fetch(`https://api.spotify.com/v1/users/${userId}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			const err = await response.text();
			return new Response(JSON.stringify({ error: 'Failed to fetch user name', details: err }), { status: response.status });
		}

		const data = await response.json();

		return new Response(JSON.stringify(data), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Failed to fetch user name' }), {
			status: 500
		});
	}
};
