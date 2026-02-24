import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const { locale, limit } = await request.json();

		const token = cookies.get('spotify_access_token');

		if (!token) {
			return new Response('No Spotify access token found', { status: 401 });
		}

		const response = await fetch(
			`https://api.spotify.com/v1/me/top/tracks?offset=0&limit=${limit}&locale=${locale}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);

		if (!response.ok) {
			const err = await response.text();
			return new Response(err, { status: response.status });
		}

		const data = await response.json();

		return new Response(JSON.stringify(data.items), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return new Response('Failed to fetch Spotify access token', { status: 500 });
	}
};
