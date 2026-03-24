// Svelte
import { get } from 'svelte/store';

// Stores
import { meStore } from '$lib/stores/me.store';
import { loadingAfterConnectionStore } from '$lib/stores/loadingAfterConnection.store';

export function signInSpotify(platformKey: 'spotify' | 'deezer', e: MouseEvent) {
	const me = get(meStore);

	if (me !== undefined && me.connectedStreamings[platformKey as 'spotify' | 'deezer'] === true) {
		e.preventDefault();

		return;
	}

	window.location.href = `/api/${platformKey}/auth/login`;

	loadingAfterConnectionStore.set({
		loading: true,
		streamingPlatform: platformKey as 'spotify' | 'deezer'
	});
}
