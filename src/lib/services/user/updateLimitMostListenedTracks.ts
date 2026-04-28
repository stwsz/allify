// Services
import { getMostListenedTracks } from '../spotify/getMostListenedTracks';

// Stores
import { userInfo } from '$lib/stores/userInfo.store';

export async function updateLimitMostListenedTracks(
	email: string | undefined,
	tracksLimit: number
) {
	if (!email || tracksLimit === undefined) return undefined;

	try {
		const request = await fetch('/api/mongodb/update-limit-most-listened-tracks', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, tracksLimit })
		});

		const response = await request.json();

		if (!response.success) return undefined;

		userInfo.update((user) => {
			if (!user?.connectedStreamings?.spotify?.mostListenedTracks) return user;
			user.connectedStreamings.spotify.mostListenedTracks.limit = response.newLimit;
			return user;
		});

		const result = await getMostListenedTracks();
		if (!result) return response;

		await fetch('/api/mongodb/update-most-listened-tracks', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email,
				mostListenedTrackAfterNewLimit: result.mostListenedTrackItem,
				mostListenedTracksAfterNewLimit: result.mostListenedTracksItems
			})
		});

		userInfo.update((user) => {
			if (!user?.connectedStreamings?.spotify?.mostListenedTracks) return user;
			user.connectedStreamings.spotify.mostListenedTracks.mostListenedTrackItem =
				result.mostListenedTrackItem;
			user.connectedStreamings.spotify.mostListenedTracks.mostListenedTracksItems =
				result.mostListenedTracksItems;
			return user;
		});

		return response;
	} catch {
		return undefined;
	}
}
