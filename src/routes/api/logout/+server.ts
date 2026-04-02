// Svelte
import { json } from '@sveltejs/kit';

// Stores
import { userInfo } from '$lib/stores/userInfo.store';

export const POST = async ({ cookies }) => {
	cookies.delete('spotify_access_token', {
		path: '/'
	});

	cookies.delete('spotify_refresh_token', {
		path: '/'
	});

	userInfo.set(undefined);

	return json({ success: true });
};
