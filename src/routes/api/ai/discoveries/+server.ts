import type { RequestHandler } from '@sveltejs/kit';
import { ANTHROPIC_API_KEY } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
	const { mostListenedTracks, mostListenedArtists } = await request.json();

	const prompt = `
		Most listened artists: ${mostListenedArtists.join(', ')}.
		Most listened songs: ${mostListenedTracks.join(', ')}.

		Task:
		Suggest exactly 5 songs and 5 artists the user will like.

		STRICT RULES:
		- DO NOT include any artist from the provided artists list.
		- DO NOT include any song from the provided songs list.
		- Do not include any artist in the "artists" list if they already appear in the "songs" list.
		- Avoid duplicates or variations (remix, live, acoustic).
		- Ensure diversity of artists.

		VALIDATION STEP (IMPORTANT):
		Before responding, internally check:
		- If ANY suggested item appears in the input lists → REMOVE and replace it.
		- Only return when ALL items are 100% new.

		OUTPUT FORMAT:
		Respond ONLY in pure JSON, no explanation:
		{
		"songs": ["Song Name - Artist Name", "Song Name - Artist Name", "Song Name - Artist Name", "Song Name - Artist Name", "Song Name - Artist Name"],
		"artists": ["Artist Name", "Artist Name", "Artist Name", "Artist Name", "Artist Name"]
		}
	`;

	try {
		const response = await fetch('https://api.anthropic.com/v1/messages', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': ANTHROPIC_API_KEY,
				'anthropic-version': '2023-06-01'
			},
			body: JSON.stringify({
				model: 'claude-haiku-4-5-20251001',
				max_tokens: 1000,
				messages: [{ role: 'user', content: prompt }]
			})
		});

		if (!response.ok) {
			return new Response(JSON.stringify({ error: 'Failed to call Claude API' }), {
				status: response.status,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const data = await response.json();
		const text = data.content
			?.map((b: { text?: string }) => b.text ?? '')
			.join('')
			.trim();
		const result = JSON.parse(text.replace(/```json|```/g, '').trim());

		return new Response(JSON.stringify(result), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (e) {
		return new Response(
			JSON.stringify({ error: 'Unexpected error while processing the request' }),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	}
};
