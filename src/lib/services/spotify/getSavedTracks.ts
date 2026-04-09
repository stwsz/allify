// Types
import type { LikedTrackSpotify } from '$lib/types/UserInfo.type';

export async function getLikedTracks() {
	let likedTracksItems = [] as LikedTrackSpotify[];

	try {
		const reqUserSavedTracks = await fetch('/api/spotify/user-saved-tracks');

		if (!reqUserSavedTracks.ok) return undefined;

		const resUserSavedTracks = await reqUserSavedTracks.json();

		for (let i = 0; i < resUserSavedTracks.length; i++) {
			likedTracksItems.push({
				addedAt: resUserSavedTracks[i].added_at,
				name: resUserSavedTracks[i].track.name,
				artists: resUserSavedTracks[i].track.artists.map((artist: any) => artist.name),
				popularity: resUserSavedTracks[i].track.popularity,
				album: {
					name: resUserSavedTracks[i].track.album.name,
					images: resUserSavedTracks[i].track.album.images
				},
				explicit: resUserSavedTracks[i].track.explicit,
				releaseDate: resUserSavedTracks[i].track.release_date,
				durationMs: resUserSavedTracks[i].track.duration_ms,
				trackLink: resUserSavedTracks[i].track.external_urls.spotify
			});
		}

		return {
			limit: 5,
			updatedAt: new Date().toLocaleDateString('en-US'),
			likedTracksItems
		};
	} catch (error) {
		return undefined;
	}
}
