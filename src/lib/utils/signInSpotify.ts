// Svelte
import { get } from 'svelte/store';

// Stores
import { userInfo } from '$lib/stores/userInfo.store';
import { loadingAfterConnectionStore } from '$lib/stores/loadingAfterConnection.store';

export function signInSpotify(platformKey: 'spotify' | 'deezer', e: MouseEvent) {
	const userInfoStore = get(userInfo);

	if (userInfoStore?.connectedStreamings.spotify?.connected === true) {
		e.preventDefault();

		return;
	}

	window.location.href = `/api/${platformKey}/auth/login`;

	loadingAfterConnectionStore.set({
		loading: true,
		streamingPlatform: platformKey as 'spotify' | 'deezer'
	});
}
