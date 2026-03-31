// Types
import type { UserInfoSpotify } from '$lib/types/UserInfo.type';

// Services
import { getMostListenedArtists } from './getMostListenedArtists';
import { getMostListenedTracks } from './getMostListenedTracks';

export async function fetchUserInfoFromSpotify() {
	let dataFromSpotify: UserInfoSpotify | undefined;

	try {
		const response = await fetch('/api/spotify/me', {
			credentials: 'include'
		});

		const data = await response.json();

		if (data.error) {
			return undefined;
		}

		dataFromSpotify = {
			connected: true,
			name: data.display_name,
			email: data.email,
			images: data.images,
			country: data.country,
			followers: data.followers.total,
			profileLink: data.external_urls.spotify,
			mostListenedArtists: undefined,
			mostListenedTracks: undefined
		};

		try {
			const mostListenedArtists = await getMostListenedArtists();

			dataFromSpotify.mostListenedArtists = mostListenedArtists;
		} catch {
			dataFromSpotify.mostListenedArtists = undefined;
		}

		try {
			const mostListenedTracks = await getMostListenedTracks();

			dataFromSpotify.mostListenedTracks = mostListenedTracks;
		} catch {
			dataFromSpotify.mostListenedTracks = undefined;
		}

		return dataFromSpotify;
	} catch {
		return undefined;
	}
}
