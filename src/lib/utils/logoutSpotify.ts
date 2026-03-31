// Stores
import { userInfo } from '$lib/stores/userInfo.store';

export async function logoutSpotify() {
	sessionStorage.removeItem('spotify-user-playlists');
	sessionStorage.removeItem('spotify-user-saved-albums');
	sessionStorage.removeItem('spotify-user-saved-tracks');
	sessionStorage.removeItem('spotify-most-listened-tracks');
	sessionStorage.removeItem('spotify-most-listened-artists');

	const prefix = 'spotify-musics-from-playlist-';
	Object.keys(sessionStorage)
		.filter((key) => key.startsWith(prefix))
		.forEach((key) => sessionStorage.removeItem(key));

	await fetch('/api/logout', {
		method: 'POST',
		credentials: 'include'
	});

	userInfo.set(undefined);
}
