// Types
import type { LikedTrackSpotify } from '$lib/types/UserInfo.type';

export async function getLikedTracks() {
	let likedTracksItems = [] as LikedTrackSpotify[];

	try {
		const reqUserLikedTracks = await fetch('/api/spotify/user-liked-tracks');

		if (!reqUserLikedTracks.ok) return undefined;

		const resUserLikedTracks = await reqUserLikedTracks.json();

		for (let i = 0; i < resUserLikedTracks.length; i++) {
			likedTracksItems.push({
				addedAt: resUserLikedTracks[i].added_at,
				name: resUserLikedTracks[i].track.name,
				artists: resUserLikedTracks[i].track.artists.map((artist: any) => artist.name),
				popularity: resUserLikedTracks[i].track.popularity,
				album: {
					name: resUserLikedTracks[i].track.album.name,
					images: resUserLikedTracks[i].track.album.images
				},
				explicit: resUserLikedTracks[i].track.explicit,
				releaseDate: resUserLikedTracks[i].track.release_date,
				durationMs: resUserLikedTracks[i].track.duration_ms,
				trackLink: resUserLikedTracks[i].track.external_urls.spotify
			});
		}

		return {
			limit: 20,
			updatedAt: new Date().toLocaleDateString('en-US'),
			likedTracksItems
		};
	} catch {
		return undefined;
	}
}
